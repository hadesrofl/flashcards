import Box from "@mui/material/Box";
import determineCardContentCssPosition from "./helper/determineCardContentCssPosition";
import Typography from "@mui/material/Typography";
import MDEditor from "@uiw/react-md-editor";
import CardContentProps from "./cardContent/CardContentProps";
import { rotationClass } from "./constants";

interface CardContentBackProps extends CardContentProps {
  show: boolean;
}

export default function CardContentBack({
  flashCard,
  show,
}: CardContentBackProps) {
  return (
    <Box
      className={`${determineCardContentCssPosition(
        flashCard.answer.length,
        flashCard.question.length
      )} inset-0 ${rotationClass}`}
    >
      <Typography
        variant="body1"
        component="div"
        className={show ? rotationClass : ""}
      >
        <MDEditor.Markdown
          style={{ backgroundColor: "inherit", color: "inherit" }}
          source={flashCard.answer}
        />
      </Typography>
    </Box>
  );
}
