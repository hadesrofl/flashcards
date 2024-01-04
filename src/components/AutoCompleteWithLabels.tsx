"use client";

import Cancel from "@mui/icons-material/Cancel";
import {
  Autocomplete,
  Box,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";

interface AutoCompleteLabelProps {
  data: string;
  handleDelete: (value: string) => void;
}

const AutoCompleteLabel = ({ data, handleDelete }: AutoCompleteLabelProps) => {
  return (
    <Chip
      label={
        <Stack direction="row" gap={1}>
          <Typography>{data}</Typography>
          <Cancel
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(data);
            }}
          />
        </Stack>
      }
    />
  );
};

interface AutoCompleteWithLabelsProps {
  initSelection?: string[];
  onChange: (texts: string[]) => void;
  options: string[];
  title?: string;
}

export default function AutoCompleteWithLabels({
  onChange,
  options,
  title,
  initSelection,
}: AutoCompleteWithLabelsProps) {
  const label = title ?? "Input";
  const [texts, setTexts] = useState<string[]>(initSelection ?? []);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [typing, setTyping] = useState<NodeJS.Timeout>();
  const DebounceTimeInMs = 750;

  const handleDelete = (value: string) => {
    const newTexts = texts.filter((val) => val !== value);
    handleChange(newTexts);
  };

  const handleChange = (latestTexts: string[]) => {
    setTexts(latestTexts);
    onChange(latestTexts);
    setCurrentInput("");
  };

  const updateCurrentInput = (newValue: string) => {
    if (newValue && texts.includes(newValue) === false) {
      handleChange([...texts, newValue]);
    }
  };

  const onValueChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    if (typing) clearTimeout(typing);

    setCurrentInput(newValue);
    setTyping(
      setTimeout(() => {
        updateCurrentInput(newValue);
        setTyping(undefined);
      }, DebounceTimeInMs)
    );
  };

  const onBlur = () => setCurrentInput("");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Autocomplete
        inputValue={currentInput}
        onInputChange={onValueChange}
        options={options.filter((option) => texts.includes(option) === false)}
        filterSelectedOptions
        getOptionLabel={(option: any) => {
          if (typeof option === "string") return option;
          return "";
        }}
        onBlur={onBlur}
        fullWidth
        handleHomeEndKeys
        autoSelect
        freeSolo
        size="small"
        renderOption={(props, option: any) => (
          <li {...props}>
            {typeof option === "string" ? option : option.name}
          </li>
        )}
        renderInput={(params) => (
          <Stack spacing={2}>
            <Box>
              {texts.map((data, index) => {
                return (
                  <AutoCompleteLabel
                    data={data}
                    handleDelete={handleDelete}
                    key={crypto.randomUUID()}
                  />
                );
              })}
            </Box>
            <TextField {...params} label={label} />
          </Stack>
        )}
      />
    </Box>
  );
}
