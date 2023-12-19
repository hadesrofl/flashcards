import AppRoutes from "@app/appRoutes";
import { redirect } from "next/navigation";
import TagsSearchParamProps from "./_shared/props/TagsSearchParamProps";

export default function FlashCardDashboard({
  searchParams,
}: TagsSearchParamProps) {
  const { tags } = searchParams;
  return redirect(
    AppRoutes.flashCardRoutes.collections(
      tags === undefined ? [] : Array.isArray(tags) ? tags : [tags]
    )
  );
}
