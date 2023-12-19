const flashCardsByTagsQuery = (tags?: string[]) => {
  const decodedTags = tags?.map((tag) => decodeURIComponent(tag));
  return tags !== undefined
    ? {
        tags: {
          some: {
            name: {
              in: decodedTags,
              mode: "insensitive",
            },
          },
        },
      }
    : undefined;
};

export default flashCardsByTagsQuery;
