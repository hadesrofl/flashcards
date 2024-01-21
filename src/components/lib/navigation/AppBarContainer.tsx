import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import BackButton from "./buttons/BackButton";
import Stack from "@mui/material/Stack";
import AppRoutes from "@app/appRoutes";
import Grid from "@mui/material/Grid";
import LiveClock from "./LiveClock";
import HomeButton from "./buttons/HomeButton";
import { Locale } from "@dictionaries/helpers/getDictionaries";

interface AppBarContainerProps {
  mobileMenu?: JSX.Element;
  children?: React.ReactNode;
  lang: Locale;
}

export default function AppBarContainer({
  mobileMenu,
  children,
  lang,
}: AppBarContainerProps) {
  const justifyClass =
    children !== undefined ? "md:justify-center" : "md:justify-center";
  const widthClass = "full";

  return (
    <AppBar position="static" className="py-2" color="inherit">
      <Toolbar className={`${justifyClass} w-${widthClass} p-0`}>
        {mobileMenu}

        <Grid container marginX={2} display={{ xs: "none", md: "flex" }}>
          <Grid item xs={1} className="flex self-center">
            <Stack direction="row" spacing={2}>
              <BackButton />
              <HomeButton href={AppRoutes.flashCardRoutes.root} />
            </Stack>
          </Grid>
          <Grid item xs={10}>
            <Stack
              direction="row"
              className={`${justifyClass} w-${widthClass}`}
              spacing={4}
            >
              {children}
            </Stack>
          </Grid>
          <Grid
            item
            xs={1}
            className="flex self-center justify-end mr-0 text-black"
          >
            <LiveClock locale={lang} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
