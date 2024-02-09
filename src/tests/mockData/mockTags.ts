import { Tag } from "@prisma/client";

export const mockTags: Tag[] = [
  {
    id: 1,
    createdAt: new Date(Date.now()),
    name: "Clean Code",
  },
  {
    id: 2,
    createdAt: new Date(Date.now()),
    name: "Software Development",
  },
];
