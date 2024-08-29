import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
}

export default function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <Button
      component={Link}
      href={href}
      sx={{ maxHeight: '40px', marginRight: 2 }} 
      variant="contained"
    >
      {children}
    </Button>
  )
}
