import { Tag } from "@prisma/client";

export default function getTagsFromPathname(
  pathName: string,
  tags: { id: number; createdAt: Date; name: string }[]
) {
  const pathNameEntries = pathName
    .split("/")
    .map((name) => decodeURIComponent(name));
  const tagsInPath: Tag[] = [];
  pathNameEntries.forEach((entry) => {
    const tag = tags.find((t) => t.name === entry);
    if (tag !== undefined) tagsInPath.push(tag);
  });
  return tagsInPath;
}
