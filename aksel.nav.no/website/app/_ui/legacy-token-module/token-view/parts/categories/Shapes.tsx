import docs from "@navikt/ds-tokens/docs.json";
import {
  WebsiteTable,
  WebsiteTableRow,
} from "@/app/_ui/website-table/WebsiteTable";
import { sanitizeName } from "../utilities";

export const ShapesView = ({ cat }: { cat: string }) => {
  const shapes = docs[cat];

  return (
    <WebsiteTable withCopy th={[{ text: "Enhet" }, { text: "Verdi" }]}>
      {shapes.map((token) => (
        <WebsiteTableRow
          key={token.name}
          tr={[
            { text: sanitizeName(token.name.replace("border-radius-", "")) },
            { text: token.value },
          ]}
          copyText={`${token.name}`}
        />
      ))}
    </WebsiteTable>
  );
};
