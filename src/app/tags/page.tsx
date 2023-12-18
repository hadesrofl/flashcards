import TagGallery from "@components/tag/TagGallery";
import dbContext from "@server/repositories/dbContext";

export default async function TagGalleryPage() {
  const tags = await dbContext.tags.list();
  return <TagGallery className="m-4" tags={tags} />;
}
