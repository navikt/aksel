import {
  WebsiteTable,
  WebsiteTableRow,
} from "@/app/_ui/website-table/WebsiteTable";
import { LegacyDocs } from "../../../legacy-docs";
import { sanitizeName } from "../utilities";

export const ZindexView = ({ cat }: { cat: string }) => {
  const zindex = LegacyDocs[cat];

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
