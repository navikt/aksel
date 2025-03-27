import { PortableTextComponentProps } from "next-sanity";
import core from "@navikt/ds-css/tokens.json";
import { BodyLong, Link } from "@navikt/ds-react";
import { Token_kategori } from "@/app/_sanity/query-types";
import { AkselTable, AkselTableRow } from "@/app/_ui/AkselTable/AkselTable";

/**
 * Lists out the "component"-level tokens.
 */
function LegacyTokenTable(props: PortableTextComponentProps<Token_kategori>) {
  const { title } = props.value;

  if (!title) {
    return null;
  }

  const tokens: { [key: string]: string } | null =
    title in core ? core[title] : null;

  if (!tokens) {
    return null;
  }

  return (
    <>
      <BodyLong>
        Deprecation warning! I vårt nye system for theming og darkmode, er
        komponent-tokens fjernet. Mer dokumentasjon for dette kommer,{" "}
        <Link href="/darkside">midlertidig dokumentasjon finner du her.</Link>
      </BodyLong>
      <AkselTable th={[{ text: "Token" }, { text: "Fallback" }]}>
        {Object.entries(tokens).map(([key, val]) => (
          <AkselTableRow key={key} tr={[{ text: key }, { text: val }]} />
        ))}
      </AkselTable>
    </>
  );
}

export { LegacyTokenTable };
