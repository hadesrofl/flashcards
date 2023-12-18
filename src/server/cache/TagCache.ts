import AppRoutes from "@app/appRoutes";
import { revalidatePath } from "next/cache";

const TagCache = {
  revalidatePaths: () => {
    revalidatePath(AppRoutes.tagRoutes.root);
  },
};

export default TagCache;
