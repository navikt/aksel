"use client";

import NextLink from "next/link";
import { Box } from "@navikt/ds-react";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardFooter,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { GodPraksisTaxonomyTag } from "./GodPraksisTaxonomyTag";

interface Props {
  slug: string | null | undefined;
  heading: string | null | undefined;
  undertema: string | null | undefined;
  innholdstype: string | null | undefined;
}

const GpLinkCard = ({ slug, heading, undertema, innholdstype }: Props) => (
  <Box asChild height="100%">
    <LinkCard>
      <LinkCardTitle as="h3">
        <LinkCardAnchor asChild>
          <NextLink href={slug ?? ""}>{heading}</NextLink>
        </LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardFooter>
        <GodPraksisTaxonomyTag type="undertema">
          {undertema}
        </GodPraksisTaxonomyTag>
        <GodPraksisTaxonomyTag type="innholdstype">
          {innholdstype}
        </GodPraksisTaxonomyTag>
      </LinkCardFooter>
    </LinkCard>
  </Box>
);

export { GpLinkCard };
