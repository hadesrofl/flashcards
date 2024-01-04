import { CommonLayoutProps } from "@app/layout";
import CenteredBox from "@components/lib/CenteredBox";
import React from "react";

export default function FlashCardSinglePageLayout({
  children,
}: CommonLayoutProps) {
  return <CenteredBox width="1/2">{children}</CenteredBox>;
}
