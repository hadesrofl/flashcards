import createTagQueryParams from "@app/_shared/tags/helpers/createTagQueryParams";
import { apiRoots } from "../routeRoots";

export const createFlashCardsRoute = () =>
  `${apiRoots.root}${apiRoots.flashcards}`;

export const getAllFlashCardsRoute = (tags: string[] = []) =>
  `${apiRoots.root}${apiRoots.flashcards}${createTagQueryParams(tags, "?")}`;

export const editFlashCardRoute = (id: number) =>
  `${apiRoots.root}${apiRoots.flashcards}/${id}`;

export const getFlashCardRoute = (id: number) =>
  `${apiRoots.root}${apiRoots.flashcards}/${id}`;

export const deleteFlashCardRoute = (id: number) =>
  `${apiRoots.root}${apiRoots.flashcards}/${id}`;
