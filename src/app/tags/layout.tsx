import { CommonLayoutProps } from "@app/layout";
import { Box } from "@mui/material";
import React from "react";

export default function TagGalleryLayout({ children }: CommonLayoutProps) {
  return <Box className="w-1/2">{children}</Box>;
}
