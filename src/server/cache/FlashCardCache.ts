import AppRoutes from "@app/appRoutes";
import { Tag } from "@prisma/client";
import { revalidatePath } from "next/cache";

const FlashCardCache = {
  revalidatePaths: async (id: number, tags: Tag[]) => {
    const tagNames = tags.map((tag) => tag.name);
    revalidatePath(AppRoutes.flashCardRoutes.root);
    revalidatePath(AppRoutes.flashCardRoutes.collections([]));
    revalidatePath(AppRoutes.flashCardRoutes.collections(tagNames));
    revalidatePath(AppRoutes.flashCardRoutes.sequence([]));
    revalidatePath(AppRoutes.flashCardRoutes.sequence(tagNames));
    revalidatePath(AppRoutes.flashCardRoutes.shuffle([]));
    revalidatePath(AppRoutes.flashCardRoutes.shuffle(tagNames));
    revalidatePath(AppRoutes.flashCardRoutes.edit(id));
    revalidatePath(AppRoutes.flashCardRoutes.singleCard(id, tagNames));
  },
};

export default FlashCardCache;
