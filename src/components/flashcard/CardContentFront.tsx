import Box from "@mui/material/Box";
import determineCardContentCssPosition from "./helper/determineCardContentCssPosition";
import Typography from "@mui/material/Typography";
import MDEditor from "@uiw/react-md-editor";
import CardContentProps from "./cardContent/CardContentProps";

export default function CardContentFront({ flashCard }: CardContentProps) {
  return (
    <Box
      className={determineCardContentCssPosition(
        flashCard.question.length,
        flashCard.answer.length
      )}
    >
      <Typography variant="body1" component="div">
        <MDEditor.Markdown
          style={{ backgroundColor: "inherit", color: "inherit" }}
          source={flashCard.question}
        />
      </Typography>
    </Box>
  );
}
