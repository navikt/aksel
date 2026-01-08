import { PortableTextComponentProps } from "next-sanity";
import { InfoCard, Link } from "@navikt/ds-react";
import {
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
} from "@navikt/ds-react/InfoCard";
import { Token_kategori } from "@/app/_sanity/query-types";

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
        <InfoCardTitle>Komponent-tokens er fjernet i versjon 8</InfoCardTitle>
      </InfoCardHeader>
      <InfoCardContent>
        Gammel dokumentasjon for disse finner du på{" "}
        <Link href="https://cdn.jsdelivr.net/npm/@navikt/ds-css@7/tokens.json">
          JsDelivery
        </Link>
      </InfoCardContent>
    </InfoCard>
  );
}

export { LegacyTokenTable };
