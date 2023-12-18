import AppRoutes from "@app/appRoutes";
import { revalidatePath } from "next/cache";

const FlashCardCache = {
  revalidatePaths: () => {
    revalidatePath(AppRoutes.flashCardRoutes.root);
  },
};

export default FlashCardCache;
