import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CenteredBox from "@components/lib/CenteredBox";
import React from "react";
import { lightTheme } from "../createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlashCards",
  description: "A little flashcard app to re-learn things",
};

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

export default function RootLayout({ children }: CommonLayoutProps) {
  const theme = lightTheme;
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CenteredBox>{children}</CenteredBox>
        </ThemeProvider>
      </body>
    </html>
  );
}
