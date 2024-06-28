import React from 'react';
import { Link as LinkUI } from '@mui/material';
import { default as NextLink } from 'next/link';

type LinkProps = {
  children: React.ReactNode;
  href: string;
  fullwidth?: boolean;
}

export default function Link({ children, href, fullwidth = false }: LinkProps) {
  return (
  <NextLink href={href}>
    <LinkUI
      align="center"
      display={fullwidth ? "block" : "inline"}
      component="span"
      mt={1}
    >
      {children}
    </LinkUI>
  </NextLink>
  )
}
