"use client";

import React from "react";
import { Link } from "@navikt/ds-react";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";

type Props = {
  href: string;
  children: React.ReactNode;
};

function WebsiteLink({ href, children }: Props) {
  const isOutbound =
    href.startsWith("http") && !href.startsWith("https://aksel.nav.no/");

  return (
    <Link
      as={NextLink}
      href={href}
      inlineText
      onClick={() =>
        umamiTrack("navigere", { kilde: "inline lenke", url: href })
      }
      {...(isOutbound
        ? {
            target: "_blank",
            rel: "noreferrer noopener",
          }
        : {})}
    >
      {children}
    </Link>
  );
}

export { WebsiteLink };
