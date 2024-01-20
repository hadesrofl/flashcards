"use client";

import CheckCircle from "@mui/icons-material/CheckCircle";
import { ListItemIcon } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Tag } from "@prisma/client";
import { useEffect, useState } from "react";

function convertSelectedTags(value: string | Tag[], selectableTags: Tag[]) {
  let newSelection: Tag[];
  if (typeof value === "string") {
    // On autofill we get a stringified value.
    const currentSelection: Tag[] = value.split(",").map((entry) => {
      const tag = selectableTags.find((t) => t.name === entry);
      return tag === undefined
        ? { id: 0, createdAt: new Date(Date.now()), name: entry }
        : tag;
    });
    newSelection = currentSelection;
  } else if (
    Array.isArray(value) &&
    value.length > 0 &&
    value.some((tag) => typeof tag === "string")
  ) {
    newSelection = [];
    value.forEach((entry) => {
      if (typeof entry === "string") {
        const tag = selectableTags.find((t) => t.name === entry);
        if (tag !== undefined) newSelection.push(tag);
      } else {
        newSelection.push(entry);
      }
    });
  } else newSelection = value;
  return newSelection;
}

interface FilterTagSelectProps {
  options: Tag[];
  initSelect: Tag[];
  onSelect: (tags: Tag[]) => void;
}

export default function FilterTagSelect({
  options,
  initSelect,
  onSelect,
}: FilterTagSelectProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initSelect);
  const selectableTags = options;

  useEffect(() => {
    setSelectedTags(initSelect);
  }, [initSelect]);

  const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event;

    let newSelection: Tag[] = convertSelectedTags(value, selectableTags);
    if (newSelection.length > 0) {
      const alreadyIncluded = selectedTags.find(
        (tag) => tag.id === newSelection[newSelection.length - 1].id
      );
      if (alreadyIncluded)
        newSelection = newSelection.filter(
          (tag) => tag.id !== alreadyIncluded.id
        );
    }
    setSelectedTags(
      newSelection.filter(
        (selected, index) => newSelection.indexOf(selected) === index
      )
    );
  };

  useEffect(() => {
    onSelect(selectedTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  return (
    <FormControl className="h-full w-full" variant="outlined">
      <InputLabel color="primary" id="filter-tag-select-label">
        Tags
      </InputLabel>
      <Select
        className="h-full"
        labelId="filter-tag-select-label"
        id="filter-tag-select"
        multiple
        value={selectedTags}
        onChange={handleChange}
        input={
          <OutlinedInput
            color="primary"
            id="select-multiple-tags"
            label="Tags"
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((tag) => (
              <Chip
                key={crypto.randomUUID()}
                label={typeof tag === "string" ? tag : tag.name}
              />
            ))}
          </Box>
        )}
      >
        {selectableTags.map((tag) => {
          const found = selectedTags.find((t) => t.id === tag.id);

          return found !== undefined ? (
            <MenuItem key={crypto.randomUUID()} value={tag.name}>
              {tag.name}
              <ListItemIcon>
                <CheckCircle />
              </ListItemIcon>
            </MenuItem>
          ) : (
            <MenuItem key={crypto.randomUUID()} value={tag.name}>
              {tag.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
