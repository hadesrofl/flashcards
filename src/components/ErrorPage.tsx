import notFoundPic from "@public/notFound.jpeg";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

interface ErrorPageProps {
  title: string;
  errorText: string;
}

export default function ErrorPage({ title, errorText }: ErrorPageProps) {
  const subtitle = "You made Bobo sad.";

  return (
    <Grid container marginTop={5}>
      <Grid item xs={12} className="flex justify-center">
        <Box className="bg-[#FFF6F2] w-fit mt-5 absolute z-100 border border-dashed rounded-xl">
          <Typography variant="h3" className="text-center" margin="1rem">
            {title}
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" className="text-center" margin="1rem">
            {subtitle}
          </Typography>
          <Typography variant="body1" className="text-center" margin="1rem">
            {errorText}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} className="flex justify-center">
        <Image
          src={notFoundPic}
          alt={
            "The error page showing the feet of two people and the sentence 'Passion led us here' above that"
          }
          className="w-screen h-fit md:w-fit md:h-4/5 border border-dashed rounded-xl"
        ></Image>
      </Grid>
    </Grid>
  );
}
