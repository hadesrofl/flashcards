import { apiRoots } from "./roots";

export const deleteTagRoute = (id: number) =>
  `${apiRoots.root}${apiRoots.tags}/${id}`;
