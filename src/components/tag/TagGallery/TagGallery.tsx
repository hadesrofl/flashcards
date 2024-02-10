import { Tag } from "@prisma/client";
import { CommonProps } from "@mui/material/OverridableComponent";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import TagButtonGroup from "../TagButtonGroup/TagButtonGroup";
import Badge from "@mui/material/Badge";
import { getCardCountByTag } from "@domain/flashcard/helpers/getCardCountByTag";
import TestIds from "@tests/testIds";

interface TagGalleryProps extends CommonProps {
  tags: Tag[];
}

export default async function TagGallery({ tags, ...props }: TagGalleryProps) {
  const iconColumnClasses = "flex justify-end";
  const cardCount = await getCardCountByTag(tags);

  return (
    <Grid container rowGap={2} {...props}>
      {tags.map((tag) => {
        const count = cardCount.get(tag.name);
        return (
          <Grid
            container
            className="items-center"
            key={crypto.randomUUID()}
            data-testid={TestIds.TagGallery.TagEntry(tag.name)}
          >
            <Grid item xs={11}>
              <Badge data-testid={TestIds.TagGallery.Badge(tag.name)} badgeContent={count} color="primary">
                <Chip label={tag.name} />
              </Badge>
            </Grid>
            <Grid item xs={1} className={iconColumnClasses}>
              <TagButtonGroup tag={tag} />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
