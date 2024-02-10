const TestIds = {
  LearningActionButton: {
    TagSelectBox: "filter-select-tag",
    TagMenuItem: (name: string) => `tag-menuItem-${name}`,
    SplitButton: {
      Toggle: "split-button-toggle",
      Menu: "split-button-menu",
    },
  },
  TagButtonGroup: {
    Root: (name: string) => `tag-button-group-${name}`,
    InputDialogButton: (name: string) => `input-dialog-button-tag-${name}`,
    DeleteDialogButton: (name: string) => `delete-dialog-button-tag-${name}`,
  },
  TagGallery: {
    Badge: (name: string) => `tag-gallery-badge-${name}`,
    TagEntry: (name: string) => `tag-gallery-entry-${name}`,
  },
};

export default TestIds;
