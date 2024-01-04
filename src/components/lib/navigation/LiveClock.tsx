"use client";
import AccessTime from "@mui/icons-material/AccessTime";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function LiveClock() {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => tick(), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const tick = () => setDate(new Date());

  return (
    <Stack direction="row" spacing={2}>
      <AccessTime />
      <Typography suppressHydrationWarning component="div" variant="body1">
        {date.toLocaleTimeString()}
      </Typography>
    </Stack>
  );
}
