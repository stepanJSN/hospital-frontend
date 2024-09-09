import AdaptiveButton from '@/app/components/Buttons/AdaptiveButton';
import Link from 'next/link';
import React from 'react';

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <AdaptiveButton
      component={Link}
      href={href}
      sx={{ maxHeight: '40px', marginRight: 2 }}
      variant="contained"
    >
      {children}
    </AdaptiveButton>
  );
}
