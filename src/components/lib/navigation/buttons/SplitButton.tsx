"use client";
import { ArrowDropDown } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import TestIds from "@tests/testIds";
import { useRef, useState } from "react";

interface SplitButtonProps {
  options: string[];
  onClick?: (selectedOption: string) => void;
  onSelect?: (selectedOption: string) => void;
}

export default function SplitButton({
  options,
  onClick,
  onSelect,
}: SplitButtonProps) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = () => {
    if (onClick !== undefined) onClick(options[selectedIndex]);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    if (onSelect !== undefined) onSelect(options[index]);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        className="w-full w-2/6"
      >
        <Button onClick={handleClick} className="w-5/6">
          {options[selectedIndex]}
        </Button>
        <Button
          size="large"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="menu"
          data-testid={TestIds.LearningActionButton.SplitButton.Toggle}
          onClick={handleToggle}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="split-button-menu"
                  data-testid={TestIds.LearningActionButton.SplitButton.Menu}
                  autoFocusItem
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === selectedIndex}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
