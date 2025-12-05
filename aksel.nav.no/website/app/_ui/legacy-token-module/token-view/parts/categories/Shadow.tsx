import {
  WebsiteTable,
  WebsiteTableRow,
} from "@/app/_ui/website-table/WebsiteTable";
import { LegacyDocs } from "../../../legacy-docs";
import { sanitizeName } from "../utilities";

export const ShadowView = ({ cat }: { cat: string }) => {
  const shadows = LegacyDocs[cat];

  return (
    <WebsiteTable withCopy th={[{ text: "Enhet" }, { text: "Verdi" }]}>
      {shadows.map((token) => (
        <WebsiteTableRow
          key={token.name}
          tr={[
            { text: sanitizeName(token.name.replace("shadow-", "")) },
            { text: token.value },
          ]}
          copyText={`${token.name}`}
        />
      ))}
    </WebsiteTable>
  );
};
