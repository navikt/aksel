import { AkselTable, AkselTableRow } from "@/web/Table";
import docs from "@navikt/ds-tokens/docs.json";

export const SpacingView = ({ cat }: { cat: string }) => {
  const spacings = docs[cat];

  return (
    <AkselTable
      withCopy
      th={[
        { text: "Token" },
        { text: "rem" },
        { text: "px" },
        { text: "demo", sronly: true, hideOnSm: true },
      ]}
    >
      {spacings.map((x) => (
        <AkselTableRow
          key={x.name}
          tr={[
            { text: x.name.replace("--a-spacing-", "") },
            { text: x.value.replace("rem", "") },
            { text: Number(x.value.replace("rem", "") * 16) },
            {
              hideOnSm: true,
              text: (
                <div
                  className="mr-auto h-8 rounded-md bg-surface-alt-3-strong"
                  style={{
                    width: x.value,
                  }}
                />
              ),
            },
          ]}
          copyText={x.name}
        />
      ))}
    </AkselTable>
  );
};
