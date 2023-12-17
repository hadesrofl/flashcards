import { Box } from "@mui/material";
import { ReactNode } from "react";

interface CenteredBoxProps {
  width?: "screen" | "full";
  children?: ReactNode | ReactNode[];
}

export default function CenteredBox({ width, children }: CenteredBoxProps) {
  return (
    <Box
      className={`flex justify-center items-center w-${
        width ?? "screen"
      } min-h-screen`}
    >
      {children}
    </Box>
  );
}
