import { apiRoots } from "./roots";

export const editTagRoute = (id: number) =>
  `${apiRoots.root}${apiRoots.tags}/${id}`;

export const deleteTagRoute = (id: number) =>
  `${apiRoots.root}${apiRoots.tags}/${id}`;
