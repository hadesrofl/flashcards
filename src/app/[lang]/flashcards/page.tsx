import AppRoutes from "@app/appRoutes";
import { redirect } from "next/navigation";

export default function FlashCardDashboard({}) {
  return redirect(AppRoutes.flashCardRoutes.collections([]));
}
