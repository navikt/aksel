"use client";

import { stegaClean } from "next-sanity";
import { Events } from "@navikt/analytics-types";
import { Link, LinkProps } from "@navikt/ds-react";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import styles from "./UmamiLink.module.css";

export const UmamiLink = ({
  lenkegruppe,
  ...props
}: LinkProps & { lenkegruppe: string }) => {
  return (
    <Link
      {...props}
      onClick={() =>
        umamiTrack(Events.NAVIGERE, {
          lenketekst:
            typeof props.children === "string"
              ? stegaClean(props.children)
              : stegaClean(props.href)!,
          destinasjon: stegaClean(props.href)!,
          lenkegruppe: stegaClean(lenkegruppe),
        })
      }
      className={styles.umamiLink}
      as={NextLink}
    />
  );
};
