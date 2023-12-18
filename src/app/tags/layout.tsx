import { CommonLayoutProps } from "@app/layout";
import Card from "@mui/material/Card";
import React from "react";

export default function TagGalleryLayout({ children }: CommonLayoutProps) {
  return <Card className="w-1/2">{children}</Card>;
}
