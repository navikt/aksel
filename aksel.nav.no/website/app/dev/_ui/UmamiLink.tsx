"use client";

import NextLink from "next/link";
import { Link, LinkProps } from "@navikt/ds-react";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import styles from "./UmamiLink.module.css";

export const UmamiLink = ({ ...props }: LinkProps & { umamiKilde: string }) => {
  return (
    <Link
      {...props}
      onClick={() =>
        umamiTrack("navigere", {
          kilde: props.umamiKilde,
          url: props.href!,
        })
      }
      className={styles.umamiLink}
      as={NextLink}
    />
  );
};
