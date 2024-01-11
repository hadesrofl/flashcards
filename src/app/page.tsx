import { redirect } from "next/navigation";
import AppRoutes from "./appRoutes";

export default async function Home() {
  return redirect(AppRoutes.flashCardRoutes.root);
}
