import { CommonLayoutProps } from "@app/layout";
import AppBarContainer from "@components/navigation/AppBarContainer";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import React from "react";
import CenteredBox from "@components/CenteredBox";

export default async function TagGalleryLayout({
  children,
}: CommonLayoutProps) {
  return (
    <Stack className="w-full">
      <AppBarContainer />
      <CenteredBox>
        <Card key={crypto.randomUUID()} className="w-1/2 flex self-center">
          {children}
        </Card>
      </CenteredBox>
    </Stack>
  );
}
