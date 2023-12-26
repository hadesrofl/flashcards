import createTagQueryParams from "@helpers/tags/createTagQueryParams";

const flashcardRoot = "/flashcards";
const tagRoot = "/tags";

function cleanTags(tags: string[]) {
  return tags !== undefined
    ? tags
        .filter((tag) => tag !== undefined && tag !== "undefined")
        .map((tag) => encodeURIComponent(tag))
    : undefined;
}

function joinTagsInPath(tags: string[] | undefined) {
  return tags !== undefined && tags.length > 0 ? tags.join("/") : "";
}

const flashCardCollectionRoute = (tags: string[]) => {
  const cleanedTags = cleanTags(tags);
  return `${flashcardRoot}/collections/${joinTagsInPath(cleanedTags)}`;
};

const flashCardSequenceRoute = (tags: string[]) => {
  const cleanedTags = cleanTags(tags);
  return `${flashcardRoot}/collections/sequence${createTagQueryParams(
    cleanedTags ?? [],
    "?"
  )}`;
};

const flashCardSingleCardRoute = (id: number, tags: string[]) => {
  const cleanedTags = cleanTags(tags);
  return `${flashcardRoot}/collections/sequence/${id}${createTagQueryParams(
    cleanedTags ?? [],
    "?"
  )}`;
};

const flashCardShuffleRoute = (tags: string[]) =>
  `${flashcardRoot}/shuffle/${joinTagsInPath(cleanTags(tags))}`;

const flashCardRoutes = {
  root: flashcardRoot,
  create: `${flashcardRoot}/create`,
  collections: flashCardCollectionRoute,
  sequence: flashCardSequenceRoute,
  singleCard: flashCardSingleCardRoute,
  shuffle: flashCardShuffleRoute,
};

const tagRoutes = {
  root: tagRoot,
};

const AppRoutes = { flashCardRoutes, tagRoutes };

export default AppRoutes;
