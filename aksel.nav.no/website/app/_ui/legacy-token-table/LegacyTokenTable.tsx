import type { PortableTextComponentProps } from "next-sanity";
import { InfoCard, Link } from "@navikt/ds-react";
import {
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
} from "@navikt/ds-react/InfoCard";
import type { Token_kategori } from "@/app/_sanity/query-types";

/**
 * Lists out the "component"-level tokens.
 */
function LegacyTokenTable(props: PortableTextComponentProps<Token_kategori>) {
  const { title } = props.value;

  if (!title) {
    return null;
  }

  return (
    <InfoCard data-color="info">
      <InfoCardHeader>
        <InfoCardTitle>Komponent-tokens ble fjernet i versjon 8</InfoCardTitle>
      </InfoCardHeader>
      <InfoCardContent>
        Gammel dokumentasjon for disse finner du på{" "}
        <Link href="https://cdn.jsdelivr.net/npm/@navikt/ds-css@7/tokens.json">
          jsDelivr
        </Link>
      </InfoCardContent>
    </InfoCard>
  );
}

export { LegacyTokenTable };
