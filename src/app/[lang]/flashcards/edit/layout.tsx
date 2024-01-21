import { CommonLayoutProps } from "@app/[lang]/layout";
import CenteredBox from "@components/lib/CenteredBox";
import Card from "@mui/material/Card";

export default function FlashCardEditPageLayout({
  children,
}: CommonLayoutProps) {
  return (
    <CenteredBox width="1/2">
      <Card className="p-8 w-full">{children}</Card>
    </CenteredBox>
  );
}
