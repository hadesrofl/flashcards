import {
  createFlashCardsRoute,
  getAllFlashCardsRoute,
  getFlashCardRoute,
  deleteFlashCardRoute,
  editFlashCardRoute,
} from "./_internal/flashcards/flashcardRoutes";
import { deleteTagRoute, editTagRoute } from "./_internal/tags/tagRoutes";

const ApiRoutes = {
  flashCards: {
    createFlashCardsRoute,
    editFlashCardRoute,
    getAllFlashCardsRoute,
    getFlashCardRoute,
    deleteFlashCardRoute,
  },
  tags: {
    editTagRoute,
    deleteTagRoute,
  },
};

export default ApiRoutes;
