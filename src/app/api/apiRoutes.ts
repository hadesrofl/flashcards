import {
  createFlashCardsRoute,
  getAllFlashCardsRoute,
  getFlashCardRoute,
  deleteFlashCardRoute,
  editFlashCardRoute,
} from "./_routes/flashcardRoutes";
import { deleteTagRoute, editTagRoute } from "./_routes/tagRoutes";

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
