import docs from "@navikt/ds-tokens/docs.json";
import {
  WebsiteTable,
  WebsiteTableRow,
} from "@/app/_ui/website-table/WebsiteTable";
import { sanitizeName } from "../utilities";

export const ZindexView = ({ cat }: { cat: string }) => {
  const zindex = docs[cat] as { name: string; value: number }[];

  return (
    <WebsiteTable withCopy th={[{ text: "Enhet" }, { text: "Verdi" }]}>
      {zindex.map((token) => (
        <WebsiteTableRow
          key={token.name}
          tr={[
            { text: sanitizeName(token.name.replace("z-index-", "")) },
            { text: token.value },
          ]}
          copyText={`${token.value}`}
        />
      ))}
    </WebsiteTable>
  );
};
