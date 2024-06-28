import React from 'react';
import { Link as LinkUI } from '@mui/material';
import { default as NextLink } from 'next/link';

type LinkProps = {
  children: React.ReactNode;
  href: string;
}

export default function Link({ children, href }: LinkProps) {
  return (
  <NextLink href={href}>
    <LinkUI
      align="center"
      display="block"
      component="span"
      mt={1}
    >
      {children}
    </LinkUI>
  </NextLink>
  )
}
