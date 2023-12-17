const flashcardRoot = "/flashcards";
const tagRoot = "/tags";

const flashCardRoutes = {
  root: flashcardRoot,
  create: `${flashcardRoot}/create`,
};

const tagRoutes = {
  root: tagRoot,
};

const AppRoutes = { flashCardRoutes, tagRoutes };

export default AppRoutes;
