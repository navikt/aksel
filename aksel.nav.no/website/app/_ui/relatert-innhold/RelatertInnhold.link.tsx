"use client";

import { Link } from "@navikt/ds-react";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";

function RelatertInnholdLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      as={NextLink}
      href={href}
      onClick={() =>
        umamiTrack("navigere", {
          kilde: "relatert innhold",
          url: href,
        })
      }
      variant="neutral"
    >
      {children}
    </Link>
  );
}

export { RelatertInnholdLink };
