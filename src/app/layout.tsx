import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CenteredBox from "@components/CenteredBox";
import React from "react";
import AppBarContainer from "@components/navigation/AppBarContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlashCards",
  description: "A little flashcard app to re-learn things",
};

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

export default function RootLayout({ children }: CommonLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CenteredBox>{children}</CenteredBox>
      </body>
    </html>
  );
}
