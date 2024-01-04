"use client";

import { Box } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownEditorProps {
  value?: string;
  onChange: (changedValue: string) => void;
}

export default function MarkdownEditor({
  onChange,
  value,
}: MarkdownEditorProps) {
  const [markdownInput, setMarkdownInput] = useState(value ?? "");

  const handleTextChange = (value: string | undefined) => {
    if (value) {
      setMarkdownInput(value);
      onChange(value);
    }
  };

  return (
    <Box>
      <MDEditor
        value={markdownInput}
        onChange={handleTextChange}
        preview="edit"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </Box>
  );
}
