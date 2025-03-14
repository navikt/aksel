import NextLink from "next/link";
import React from "react";
import { Link } from "@navikt/ds-react";

type Props = {
  href: string;
  children: React.ReactNode;
};

const AkselLink = ({ href, children }: Props) => {
  const isOutbound =
    href.startsWith("http") && !href.startsWith("https://aksel.nav.no/");
  return (
    <Link
      as={NextLink}
      href={href}
      inlineText
      data-umami-event="navigere"
      data-umami-kilde="inline lenke"
      {...(isOutbound
        ? {
            target: "_blank",
            rel: "noreferrer noopener",
            /* https://umami.is/docs/track-outbound-links */
            ["data-umami-event-url"]: href,
          }
        : {})}
    >
      {children}
    </Link>
  );
};

export default AkselLink;
