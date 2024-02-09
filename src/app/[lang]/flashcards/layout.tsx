import dbContext from "@app/api/_internal/shared/db/dbContext";
import AppRoutes from "@app/appRoutes";
import { CommonLayoutProps } from "@app/[lang]/layout";
import LearningActionButton from "@components/flashcard/buttons/LearningActionButton/LearningActionButton";
import CenteredBox from "@components/lib/CenteredBox";
import AppBarContainer from "@components/lib/navigation/AppBarContainer";
import MobileMenu, {
  MenuEntry,
} from "@components/lib/navigation/menu/MobileMenu";
import AddCircleRounded from "@mui/icons-material/AddCircleRounded";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { getDictionary } from "@dictionaries/helpers/getDictionaries";
import { LangParam } from "@app/_shared/tags/helpers/langParam";

export default async function FlashCardGalleryLayout({
  children,
  params,
}: CommonLayoutProps & LangParam) {
  const tags = await dbContext.tags.list();
  const dictionary = await getDictionary(params.lang);
  const showTagsButtonText = dictionary.AppBar.ShowTags;
  const menuEntries: MenuEntry[] = [
    { name: "Home", href: AppRoutes.flashCardRoutes.root },
    { name: "Tags", href: AppRoutes.tagRoutes.root },
  ];

  return (
    <Stack className="w-full" spacing={2}>
      <AppBarContainer
        mobileMenu={
          <Grid container display={{ sm: "flex", md: "none" }}>
            <Grid item xs={12}>
              <Stack direction="row" className="justify-between">
                <MobileMenu entries={menuEntries} />
                <Link
                  href={AppRoutes.flashCardRoutes.create}
                  className="self-center"
                >
                  <IconButton>
                    <AddCircleRounded />
                  </IconButton>
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} paddingLeft="2px">
              <LearningActionButton tags={tags} />
            </Grid>
          </Grid>
        }
        lang={params.lang}
      >
        <Link href={AppRoutes.flashCardRoutes.create} className="self-center">
          <IconButton>
            <AddCircleRounded />
          </IconButton>
        </Link>
        <Link href={AppRoutes.tagRoutes.root} className="self-center">
          <Button variant="contained">{showTagsButtonText}</Button>
        </Link>
        <LearningActionButton tags={tags} />
      </AppBarContainer>
      <CenteredBox width="screen">{children}</CenteredBox>
    </Stack>
  );
}
