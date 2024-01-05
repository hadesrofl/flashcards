import { apiRoots } from "../routeRoots";

export const editTagRoute = (id: number) =>
  `${apiRoots.root}${apiRoots.tags}/${id}`;

export const deleteTagRoute = (id: number) =>
  `${apiRoots.root}${apiRoots.tags}/${id}`;
