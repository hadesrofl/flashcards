import {
  createFlashCardsRoute,
  getAllFlashCardsRoute,
  getFlashCardRoute,
  deleteFlashCardRoute,
  editFlashCardRoute,
} from "./_routes/flashcardRoutes";
import { deleteTagRoute } from "./_routes/tagRoutes";

const ApiRoutes = {
  flashCards: {
    createFlashCardsRoute,
    editFlashCardRoute,
    getAllFlashCardsRoute,
    getFlashCardRoute,
    deleteFlashCardRoute,
  },
  tags: {
    deleteTagRoute,
  },
};

export default ApiRoutes;
