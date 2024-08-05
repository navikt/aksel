import NextLink from "next/link";
import React from "react";
import { Link } from "@navikt/ds-react";
import { amplitudeLogNavigation } from "@/logging";

type Props = {
  href: string;
  children: React.ReactNode;
};

const AkselLink = ({ href, children }: Props) => (
  <Link
    as={NextLink}
    href={href}
    inlineText
    onClick={(e) =>
      amplitudeLogNavigation("link", e.currentTarget.getAttribute("href"))
    }
    {...(href.startsWith("http") && !href.startsWith("https://aksel.nav.no/")
      ? { target: "_blank", rel: "noreferrer noopener" }
      : {})}
  >
    {children}
  </Link>
);

export default AkselLink;
