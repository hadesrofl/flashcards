"use client";
import CenteredBox from "@components/lib/CenteredBox";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import AppRoutes from "../appRoutes";
import { useContext } from "react";
import { DictionaryContext } from "@dictionaries/helpers/dictionaryContext";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  const dictionary = useContext(DictionaryContext);
  const reload = () => {
    router.replace(AppRoutes.flashCardRoutes.root);
  };
  return (
    <CenteredBox width="1/2">
      <Stack spacing={2} className="items-center">
        <Typography variant="h2">
          {dictionary.Errors.pages.generic.text}
        </Typography>
        <Typography variant="body1">{error.message}</Typography>
        <Typography variant="subtitle1">Digest: {error.digest}</Typography>
        <Button
          variant="contained"
          color="primary"
          className="w-1/2"
          onClick={reload}
        >
          {dictionary.Errors.pages.generic.buttons.tryAgain}
        </Button>
      </Stack>
    </CenteredBox>
  );
}
