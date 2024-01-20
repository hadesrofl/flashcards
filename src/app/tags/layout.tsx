import { CommonLayoutProps } from "@app/layout";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import React from "react";
import CenteredBox from "@components/lib/CenteredBox";
import AppBarContainer from "@components/lib/navigation/AppBarContainer";
import MobileMenu, {
  MenuEntry,
} from "@components/lib/navigation/menu/MobileMenu";
import AppRoutes from "@app/appRoutes";

export default async function TagGalleryLayout({
  children,
}: CommonLayoutProps) {
  const menuEntries: MenuEntry[] = [
    { name: "Home", href: AppRoutes.flashCardRoutes.root },
  ];
  return (
    <Stack className="w-full">
      <AppBarContainer mobileMenu={<MobileMenu entries={menuEntries} />} />
      <CenteredBox>
        <Card
          key={crypto.randomUUID()}
          className="w-5/6 md:w-1/2 flex self-center"
        >
          {children}
        </Card>
      </CenteredBox>
    </Stack>
  );
}
