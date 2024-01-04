import Box from "@mui/material/Box";
import determineCardContentCssPosition from "./helper/determineCardContentCssPosition";
import Typography from "@mui/material/Typography";
import MDEditor from "@uiw/react-md-editor";
import CardContentProps from "./cardContent/CardContentProps";
import Divider from "@mui/material/Divider";

export default function CardContentFront({ flashCard }: CardContentProps) {
  return (
    <Box
      className={determineCardContentCssPosition(
        flashCard.questionText.length,
        flashCard.answer.length
      )}
    >
      <Typography variant="h4">{flashCard.question}</Typography>
      <Divider sx={{ marginBottom: "1rem" }} />
      <Typography variant="body1" component="div">
        <MDEditor.Markdown
          style={{ backgroundColor: "inherit", color: "inherit" }}
          source={flashCard.questionText}
        />
      </Typography>
    </Box>
  );
}
