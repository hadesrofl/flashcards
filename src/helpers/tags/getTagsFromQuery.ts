import { Tag } from "@prisma/client";
import { ReadonlyURLSearchParams } from "next/navigation";
import { TagQueryFieldName } from "./Constants";

export function getTagsFromQuery(query: ReadonlyURLSearchParams, tags: Tag[]) {
  if (query.has(TagQueryFieldName) === false) return [];
  const queryTags = query.getAll(TagQueryFieldName);
  const extractedTags: Tag[] = [];
  queryTags.forEach((qt) => {
    const queryTag = decodeURIComponent(qt);
    const foundTag = tags.find((t) => t.name === queryTag);
    if (foundTag) extractedTags.push(foundTag);
  });
  return extractedTags;
}

export function getTagsFromQueryServerComponent(
  queryTags: string | string[] | undefined
) {
  if (queryTags === undefined) return [];
  if (Array.isArray(queryTags))
    return queryTags.map((tag) => decodeURIComponent(tag));
  return [decodeURIComponent(queryTags)];
}
