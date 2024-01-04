import Box from "@mui/material/Box";
import determineCardContentCssPosition from "../../helper/determineCardContentCssPosition";
import Typography from "@mui/material/Typography";
import MDEditor from "@uiw/react-md-editor";
import CardContentProps from "./CardContentProps";
import { rotationClass } from "../../constants";
import { Divider } from "@mui/material";

interface CardContentBackProps extends CardContentProps {
  show: boolean;
}

export default function CardContentBack({
  flashCard,
  show,
}: CardContentBackProps) {
  const answerTitle = "Answer";
  return (
    <Box
      className={`${determineCardContentCssPosition(
        flashCard.answer.length,
        flashCard.questionText.length
      )} inset-0 ${rotationClass}`}
    >
      <Typography variant="h3" className={show ? rotationClass : ""}>
        {answerTitle}
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }} />
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
