import AppRoutes from "@app/appRoutes";
import { CommonLayoutProps } from "@app/layout";
import CenteredBox from "@components/CenteredBox";
import AppBarContainer from "@components/navigation/AppBarContainer";
import LearningActionButton from "@components/navigation/LearningActionButton";
import AddCircleRounded from "@mui/icons-material/AddCircleRounded";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import dbContext from "@server/repositories/dbContext";
import Link from "next/link";

export default async function FlashCardGalleryLayout({
  children,
}: CommonLayoutProps) {
  const tags = await dbContext.tags.list();
  const showTagsButtonText = "Show Tags";

  return (
    <Stack className="w-full mt-6">
      <AppBarContainer>
        <Link href={AppRoutes.flashCardRoutes.create} className="self-center">
          <IconButton color="success">
            <AddCircleRounded />
          </IconButton>
        </Link>
        <Link href={AppRoutes.tagRoutes.root} className="self-center">
          <Button>{showTagsButtonText}</Button>
        </Link>
        <LearningActionButton tags={tags} />
      </AppBarContainer>
      <CenteredBox width="screen">{children}</CenteredBox>
    </Stack>
  );
}
