import {
  createFlashCardsRoute,
  getAllFlashCardsRoute,
  getFlashCardRoute,
  deleteFlashCardRoute,
} from "./_routes/flashcardRoutes";
import { deleteTagRoute } from "./_routes/tagRoutes";

const ApiRoutes = {
  flashCards: {
    createFlashCardsRoute,
    getAllFlashCardsRoute,
    getFlashCardRoute,
    deleteFlashCardRoute,
  },
  tags: {
    deleteTagRoute,
  },
};

export default ApiRoutes;
