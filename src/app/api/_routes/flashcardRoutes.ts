import { apiRoots } from "./roots";

export const createFlashCardsRoute = () =>
  `${apiRoots.root}${apiRoots.flashcards}`;

export const getAllFlashCardsRoute = () =>
  `${apiRoots.root}${apiRoots.flashcards}`;

export const getFlashCardRoute = (id: number) =>
  `${apiRoots.root}${apiRoots.flashcards}/${id}`;

export const deleteFlashCardRoute = (id: number) =>
  `${apiRoots.root}${apiRoots.flashcards}/${id}`;
