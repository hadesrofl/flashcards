import Home from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";

interface HomeButtonProps {
  href: string;
}

export default function HomeButton({ href }: HomeButtonProps) {
  return (
    <Link href={href}>
      <IconButton>
        <Home />
      </IconButton>
    </Link>
  );
}
