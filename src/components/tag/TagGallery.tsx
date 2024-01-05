import { Tag } from "@prisma/client";
import { CommonProps } from "@mui/material/OverridableComponent";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import TagButtonGroup from "./TagButtonGroup";

interface TagGalleryProps extends CommonProps {
  tags: Tag[];
}

export default function TagGallery({ tags, ...props }: TagGalleryProps) {
  const iconColumnClasses = "flex justify-end";

  return (
    <Grid container rowGap={2} {...props}>
      {tags.map((tag) => {
        return (
          <Grid container className="items-center" key={crypto.randomUUID()}>
            <Grid item xs={11}>
              <Chip label={tag.name} />
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
