import {
  WebsiteTable,
  WebsiteTableRow,
} from "@/app/_ui/website-table/WebsiteTable";
import { LegacyDocs } from "../../../legacy-docs";

export const SpacingView = ({ cat }: { cat: string }) => {
  const spacings = LegacyDocs[cat];

  return (
    <WebsiteTable
      withCopy
      th={[
        { text: "Token" },
        { text: "rem" },
        { text: "px" },
        { text: "demo", sronly: true, hideOnSm: true },
      ]}
    >
      {spacings.map((x) => (
        <WebsiteTableRow
          key={x.name}
          tr={[
            { text: x.name.replace("--a-spacing-", "") },
            { text: x.value.replace("rem", "") },
            { text: Number(x.value.replace("rem", "") * 16) },
            {
              hideOnSm: true,
              text: (
                <div
                  style={{
                    width: x.value,
                    backgroundColor: "var(--a-bg-surface-alt-3-strong)",
                    borderRadius: "8px",
                    height: "2rem",
                    marginRight: "auto",
                  }}
                />
              ),
            },
          ]}
          copyText={x.name}
        />
      ))}
    </WebsiteTable>
  );
};
