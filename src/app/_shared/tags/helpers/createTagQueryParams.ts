import { TagQueryFieldName } from "./Constants";

export default function createTagQueryParams(
  tags: string[],
  startingCharacter: "?" | "&"
) {
  if (tags === undefined || tags.length <= 0) return "";
  let ret = "";
  tags.forEach((tag, index) => {
    if (index === 0) ret = `${startingCharacter}${TagQueryFieldName}=${tag}`;
    else ret += `&${TagQueryFieldName}=${tag}`;
  });
  return ret;
}
