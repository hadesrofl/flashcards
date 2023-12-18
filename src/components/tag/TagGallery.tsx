import { Tag } from "@prisma/client";
import { CommonProps } from "@mui/material/OverridableComponent";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import TagButtonGroup from "./TagButtonGroup";

interface TagGalleryProps extends CommonProps {
  tags: Tag[];
}

export default function TagGallery({ tags, ...props }: TagGalleryProps) {
  const iconColumnClasses = "flex items-end";
  const noTagsCreatedText = "No tags created yet :(";

  return tags.length > 0 ? (
    <Grid container {...props}>
      {tags.map((tag) => {
        return (
          <Grid container key={crypto.randomUUID()}>
            <Grid item xs={9}>
              <Chip label={tag.name} />
            </Grid>
            <Grid item xs={3} className={iconColumnClasses}>
              <TagButtonGroup tag={tag} />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  ) : (
    <Typography variant="h1">{noTagsCreatedText}</Typography>
  );
}
