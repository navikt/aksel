import { BodyShort, Detail } from "@navikt/ds-react";
import { CopyToken } from "./CopyTokenv2";
import color from "color";

export const Frame = ({
  tokens,
  styles,
  element: Element,
}: {
  tokens: { name: string; value: string; description?: string }[];
  styles: string;
  element?: ({ token, name }: { token: string; name?: string }) => JSX.Element;
}) => {
  const hasDescription = !!tokens.find((x) => x?.description);
  return (
    <table className="w-full">
      <thead className="sr-only">
        <tr>
          <td />
          <th>Token navn</th>
          <th className="hidden md:block">Verdi</th>
          {hasDescription && <th className="hidden md:block">Beskrivelse</th>}
        </tr>
      </thead>
      <tbody>
        {tokens.map((c) => {
          const isColor = styles === "color" || styles === "background";
          const colorNode = isColor && color(c.value);

          return (
            <tr key={c.name} className="flex items-center gap-1">
              <td className="component-checkered-bg m-2 mr-0 rounded-md p-0">
                {Element ? (
                  <Element token={c.value} name={c.name} />
                ) : (
                  <div
                    style={{ [styles]: c.value }}
                    className="min-h-8 ring-border-subtle aspect-[2/1] h-full w-full rounded-md ring-1 ring-inset"
                    aria-hidden
                  />
                )}
              </td>
              <BodyShort as="td" size="small">
                <CopyToken val={c.name} />
              </BodyShort>
              <BodyShort
                as="td"
                size="small"
                className="text-text-subtle hidden text-sm tracking-tighter md:block"
              >
                <CopyToken
                  val={
                    isColor
                      ? colorNode.valpha === 1
                        ? colorNode.hex().toString()
                        : colorNode.hexa().toString()
                      : c.value ?? ""
                  }
                />
              </BodyShort>
              <Detail as="td" className="hidden md:block">
                {c.description}
              </Detail>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
