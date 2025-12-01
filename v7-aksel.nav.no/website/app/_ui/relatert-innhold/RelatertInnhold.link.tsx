"use client";

import NextLink from "next/link";
import { Link } from "@navikt/ds-react";

function RelatertInnholdLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link as={NextLink} href={href} variant="neutral">
      {children}
    </Link>
  );
}

export { RelatertInnholdLink };
