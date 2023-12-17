import {
  createFlashCardsRoute,
  getAllFlashCardsRoute,
  getFlashCardRoute,
  deleteFlashCardRoute,
} from "./_routes/flashcardRoutes";

const ApiRoutes = {
  flashCards: {
    createFlashCardsRoute,
    getAllFlashCardsRoute,
    getFlashCardRoute,
    deleteFlashCardRoute,
  },
};

export default ApiRoutes;
