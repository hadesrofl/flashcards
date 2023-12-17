"use client";

import { Box } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

interface MarkdownEditorProps {
  onChange: (changedValue: string) => void;
}

export default function MarkdownEditor({ onChange }: MarkdownEditorProps) {
  const [markdownInput, setMarkdownInput] = useState("");

  const handleTextChange = (value: string | undefined) => {
    if (value) {
      setMarkdownInput(value);
      onChange(value);
    }
  };

  return (
    <Box>
      <MDEditor
        className="h-full"
        value={markdownInput}
        onChange={handleTextChange}
        preview="edit"
      />
    </Box>
  );
}
