import dbContext from "@server/repositories/dbContext";
import { redirect } from "next/navigation";
import AppRoutes from "./appRoutes";

export default async function Home() {
  const flashCards = await dbContext.flashCards.list(undefined, 0, 1);
  return redirect(
    flashCards.length > 0
      ? AppRoutes.flashCardRoutes.root
      : AppRoutes.flashCardRoutes.create
  );
}
