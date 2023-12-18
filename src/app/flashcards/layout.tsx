import { CommonLayoutProps } from "@app/layout";
import CenteredBox from "@components/CenteredBox";
import AppBarContainer from "@components/navigation/AppBarContainer";
import Stack from "@mui/material/Stack";
import dbContext from "@server/repositories/dbContext";

export default async function FlashCardGalleryLayout({
  children,
}: CommonLayoutProps) {
  const tags = await dbContext.tags.list();

  return (
    <Stack className="w-full">
      <AppBarContainer>
      </AppBarContainer>
      <CenteredBox width="screen">{children}</CenteredBox>
    </Stack>
  );
}
