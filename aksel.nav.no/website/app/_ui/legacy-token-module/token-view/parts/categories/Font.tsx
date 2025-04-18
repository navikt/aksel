import docs from "@navikt/ds-tokens/docs.json";
import {
  WebsiteTable,
  WebsiteTableRow,
} from "@/app/_ui/website-table/WebsiteTable";
import { sanitizeName } from "../utilities";

export const FontView = ({ cat }: { cat: string }) => {
  const fonts = docs[cat];

  return (
    <WebsiteTable
      withCopy
      th={[
        { text: "Token" },
        { text: "Verdi" },
        { text: "Demo", sronly: true },
      ]}
    >
      {fonts.map((x) => (
        <WebsiteTableRow
          key={x.name}
          tr={[
            { text: sanitizeName(x.name.replace("--a-font-", "")) },
            { text: x.value },
            { text: getDemoCell(x) },
          ]}
          copyText={x.name}
        />
      ))}
    </WebsiteTable>
  );
};

function getDemoCell({ value, name }: { value: string; name: string }) {
  switch (true) {
    case name.includes("weight"):
      return <span style={{ fontWeight: value }}>Foreldrepenger</span>;
    case name.includes("line-height"):
      return (
        <span style={{ lineHeight: value }}>
          Hello <br />
          World
        </span>
      );
    case name.includes("size-heading"):
      return (
        <span
          className="leading-none"
          style={{ fontSize: value, fontWeight: value }}
        >
          Aa
        </span>
      );

    case name.includes("size"):
      return <span style={{ fontSize: value }}>Aa</span>;

    default:
      return <span style={{ fontSize: value }}>Foreldrepenger</span>;
  }
}
