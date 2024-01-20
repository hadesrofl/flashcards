"use client";
import MenuRounded from "@mui/icons-material/MenuRounded";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface MobileMenuProps {
  entries: MenuEntry[];
  children?: ReactNode;
}

export interface MenuEntry {
  href: string;
  name: string;
}

export default function MobileMenu({ entries, children }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  return (
    <Box display={{ xs: "flex", md: "none" }}>
      <IconButton
        size="large"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={openMenu}
        color="inherit"
      >
        <MenuRounded />
      </IconButton>
      <Menu
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={menuOpen}
        onClose={closeMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {entries.map((entry) => {
          return (
            <MenuItem key={entry.name}>
              <Link href={entry.href}>{entry.name}</Link>
            </MenuItem>
          );
        })}
      </Menu>
      {children}
    </Box>
  );
}
