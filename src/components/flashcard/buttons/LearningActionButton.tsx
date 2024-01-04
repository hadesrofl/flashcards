"use client";
import { Tag } from "@prisma/client";
import FilterTagSelect from "@components/tag/FilterTagSelect";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import SplitButton from "@components/lib/navigation/buttons/SplitButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AppRoutes from "@app/appRoutes";
import { getTagsFromQuery } from "@helpers/tags/getTagsFromQuery";
import getTagsFromPathname from "@helpers/tags/getTagsFromPathname";

interface LearningActionButtonProps {
  tags: Tag[];
}

const actions = {
  shuffle: "Shuffle",
  showCollection: "Show Collection",
  showInSequence: "Show in Sequence",
};

function createNextRoute(selectedAction: string, selectedTags: Tag[]) {
  switch (selectedAction) {
    case actions.shuffle:
      return AppRoutes.flashCardRoutes.shuffle(
        selectedTags.map((tag) => {
          return typeof tag === "string" ? tag : tag.name;
        })
      );
    case actions.showCollection:
      return AppRoutes.flashCardRoutes.collections(
        selectedTags.map((tag) => {
          return typeof tag === "string" ? tag : tag.name;
        })
      );
    case actions.showInSequence:
      return AppRoutes.flashCardRoutes.sequence(
        selectedTags.map((tag) => {
          return typeof tag === "string" ? tag : tag.name;
        })
      );
  }
}

export default function LearningActionButton({
  tags,
}: LearningActionButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const options = Object.values(actions);

  useEffect(() => {
    const tagsInPath = getTagsFromPathname(pathname, tags);
    const tagsInQuery = getTagsFromQuery(query, tags);
    const initSelectedTags = tagsInPath.concat(tagsInQuery);
    setSelectedTags(
      initSelectedTags.filter(
        (tag, index) => initSelectedTags.indexOf(tag) === index
      )
    );
  }, [pathname, query, tags]);

  const handleTagSelect = (tags: Tag[]) => {
    setSelectedTags(tags);
  };

  const handleSelectedAction = (action: string) => {
    const route = createNextRoute(action, selectedTags);
    if (route !== undefined) router.prefetch(route);
  };

  const handleClick = (action: string) => {
    const route = createNextRoute(action, selectedTags);
    if (route !== undefined) router.push(route);
  };

  return (
    <Stack direction="row" className="w-1/2" spacing={4}>
      <FilterTagSelect
        options={tags}
        initSelect={selectedTags}
        onSelect={handleTagSelect}
      />
      <SplitButton
        options={options}
        onClick={handleClick}
        onSelect={handleSelectedAction}
      />
    </Stack>
  );
}
