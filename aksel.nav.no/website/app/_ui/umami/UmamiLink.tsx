"use client";

import { stegaClean } from "next-sanity";
import { Events } from "@navikt/analytics-types";
import { Link, type LinkProps } from "@navikt/ds-react";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import styles from "./UmamiLink.module.css";

export const UmamiLink = ({
  lenkegruppe,
  subtle = false,
  nativeLink = false,
  ...props
}: LinkProps & {
  lenkegruppe: string;
  subtle?: boolean;
  nativeLink?: boolean;
}) => {
  function scrollToHash(href: string) {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <Link
      {...props}
      onClick={() => {
        umamiTrack(Events.NAVIGERE, {
          lenketekst:
            typeof props.children === "string"
              ? stegaClean(props.children)
              : (stegaClean(props.href) ?? ""),
          destinasjon: stegaClean(props.href) ?? "",
          lenkegruppe: stegaClean(lenkegruppe),
        });
        props.href && scrollToHash(props.href);
      }}
      className={`${styles.umamiLink} ${subtle ? styles.subtle : ""}`}
      as={nativeLink ? "a" : NextLink}
    />
  );
};
