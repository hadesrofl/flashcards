import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import BackButton from "./BackButton";
import Stack from "@mui/material/Stack";

interface AppBarContainerProps {
  children?: React.ReactNode;
}

export default function AppBarContainer({ children }: AppBarContainerProps) {
  const justifyClass =
    children !== undefined ? "justify-center" : "justify-center";
  const widthClass = children !== undefined ? "full" : "1/2";

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
      <Toolbar className={`${justifyClass} w-${widthClass} p-0`}>
        <Stack
          direction="row"
          className={`${justifyClass} w-${widthClass}`}
          spacing={4}
        >
          <BackButton />
          {children}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
