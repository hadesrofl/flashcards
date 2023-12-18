import { CommonLayoutProps } from "@app/layout";
import CenteredBox from "@components/CenteredBox";

export default function FlashCardCreatePageLayout({
  children,
}: CommonLayoutProps) {
  return <CenteredBox width="1/2">{children}</CenteredBox>;
}
