"use client";

import { stegaClean } from "next-sanity";
import { Events } from "@navikt/analytics-types";
import { Link, LinkProps } from "@navikt/ds-react";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import styles from "./UmamiLink.module.css";

export const UmamiLink = ({
  umamiKilde,
  ...props
}: LinkProps & { umamiKilde: string }) => {
  return (
    <Link
      {...props}
      onClick={() =>
        umamiTrack(Events.NAVIGERE, {
          lenketekst: stegaClean(umamiKilde),
          destinasjon: stegaClean(props.href)!,
        })
      }
      className={styles.umamiLink}
      as={NextLink}
    />
  );
};
