import { redirect } from "next/navigation";
import AppRoutes from "../appRoutes";
import { seed } from "@app/api/_internal/shared/db/seeding/seed";
import dbContext from "@app/api/_internal/shared/db/dbContext";

export default async function Home() {
  if (process.env.DATABASE_SEED_DATA === "true")
    await seed(dbContext.flashCards);

  return redirect(AppRoutes.flashCardRoutes.root);
}
