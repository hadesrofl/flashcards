import dbContext from "@app/api/_internal/shared/db/dbContext";
import TagGallery from "@components/tag/TagGallery/TagGallery";
import NoTagDialog from "@components/tag/dialog/NoTagDialog/NoTagDialog";

export default async function TagGalleryPage() {
  const tags = await dbContext.tags.list();
  return tags.length > 0 ? (
    <TagGallery className="m-4" tags={tags} />
  ) : (
    <NoTagDialog />
  );
}
