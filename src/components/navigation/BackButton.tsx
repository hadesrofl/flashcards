"use client";
import ArrowCircleLeft from "@mui/icons-material/ArrowCircleLeft";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const navigateBack = () => {
    router.back();
  };

  return (
    <IconButton onClick={navigateBack}>
      <ArrowCircleLeft />
    </IconButton>
  );
}
