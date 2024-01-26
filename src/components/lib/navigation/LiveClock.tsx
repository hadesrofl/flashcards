"use client";
import { Locale } from "@dictionaries/helpers/getDictionaries";
import AccessTime from "@mui/icons-material/AccessTime";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface LiveClockProps {
  locale: Locale;
}

export default function LiveClock({ locale }: LiveClockProps) {
  const [date, setDate] = useState<Date>(new Date());
  const dateLocale = new Intl.Locale(locale);

  useEffect(() => {
    const intervalId = setInterval(() => tick(), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const tick = () => setDate(new Date());

  return (
    <Stack direction="row" spacing={2}>
      <AccessTime />
      <Typography suppressHydrationWarning component="div" variant="body1">
        {date.toLocaleTimeString(dateLocale)}
      </Typography>
    </Stack>
  );
}
