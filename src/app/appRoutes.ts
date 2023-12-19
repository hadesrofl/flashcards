const flashcardRoot = "/flashcards";
const tagRoot = "/tags";

const flashCardCollectionRoute = (tags: string[]) => {
  const cleanedTags =
    tags !== undefined
      ? tags
          .filter((tag) => tag !== undefined && tag !== "undefined")
          .map((tag) => encodeURIComponent(tag))
      : undefined;
  return `${flashcardRoot}/collections/${
    cleanedTags !== undefined && cleanedTags.length > 0
      ? cleanedTags.join("/")
      : ""
  }`;
};
const flashCardRoutes = {
  root: flashcardRoot,
  create: `${flashcardRoot}/create`,
  collections: flashCardCollectionRoute,
};

const tagRoutes = {
  root: tagRoot,
};

const AppRoutes = { flashCardRoutes, tagRoutes };

export default AppRoutes;
