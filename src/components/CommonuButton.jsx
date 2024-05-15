import { Button } from "@mui/material";
import React from "react";

export default function CommonuButton({
  children,
  variant,
  style,
  onClick = () => {},
}) {
  return (
    <Button variant={variant} onClick={onClick} sx={style}>
      {children}
    </Button>
  );
}
