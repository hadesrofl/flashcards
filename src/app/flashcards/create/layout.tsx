import { CommonLayoutProps } from "@app/layout";
import CenteredBox from "@components/CenteredBox";
import Card from "@mui/material/Card";

export default function FlashCardCreatePageLayout({
  children,
}: CommonLayoutProps) {
  return (
    <CenteredBox width="1/2">
      <Card className="p-8">{children}</Card>
    </CenteredBox>
  );
}
