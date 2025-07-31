import { PortableTextComponentProps } from "next-sanity";
import core from "@navikt/ds-css/tokens.json";
import { BodyLong, Link } from "@navikt/ds-react";
import { Token_kategori } from "@/app/_sanity/query-types";
import {
  WebsiteTable,
  WebsiteTableRow,
} from "@/app/_ui/website-table/WebsiteTable";
import styles from "./LegacyTokenTable.module.css";

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
        <strong data-color="warning" className={styles.legacyTokenTableWarning}>
          Deprecation warning:{" "}
        </strong>
        <span>
          I det nye systemet for theming og darkmode, er komponent-tokens
          fjernet. Mer dokumentasjon for dette kommer,{" "}
        </span>
        <Link href="/darkside">midlertidig dokumentasjon finner du her.</Link>
      </BodyLong>
      <WebsiteTable th={[{ text: "Token" }, { text: "Fallback" }]}>
        {Object.entries(tokens).map(([key, val]) => (
          <WebsiteTableRow key={key} tr={[{ text: key }, { text: val }]} />
        ))}
      </WebsiteTable>
    </>
  );
}

export { LegacyTokenTable };
