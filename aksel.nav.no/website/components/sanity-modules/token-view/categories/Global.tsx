import { FilesIcon } from "@navikt/aksel-icons";
import { BodyShort, CopyButton } from "@navikt/ds-react";
import docs from "@navikt/ds-tokens/docs.json";
import color from "tinycolor2";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const GlobalView = ({ cat }: { cat: string }) => {
  const colors: { name: string; value: string }[] = docs[cat];
  console.log(colors);

  const sanitize = (x: string) =>
    capitalize(x.replace("--a-", "").replaceAll("-", " "));
  return (
    <div className="mt-8 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-6">
      {colors.map((x) => {
        const c = color(x.value);

        const alpha = c.getAlpha() !== 1;
        const colorname = alpha
          ? c.toRgbString()
          : c.toHexString().toUpperCase();
        return (
          <div key={x.name} id={x.name} className="flex w-fit items-center">
            <div
              style={{
                background: `var(${x.name})`,
                boxShadow: `inset 0 2px 4px 0 rgba(${
                  c.getLuminance() > 0.5 ? "0,0,0,0.06" : "255,255,255,0.2"
                })`,
              }}
              className="group mr-3 grid h-12 w-12 place-content-center rounded-lg"
            >
              <CopyButton
                variant="neutral"
                copyText={x.name}
                className="focus-visible:shadow-focus-gap rounded-lg opacity-0 duration-0 focus-visible:opacity-100 group-hover:opacity-100 group-hover:transition-opacity"
                icon={<FilesIcon title={x.name} fontSize="1.5rem" />}
                style={{
                  color: color
                    .mostReadable(x.value, ["#fff", "#262626"])
                    .toHexString(),
                }}
              />
            </div>

            <BodyShort as="dl">
              <dt>{sanitize(x.name)}</dt>
              <dd className="text-text-subtle text-medium">{colorname}</dd>
            </BodyShort>
          </div>
        );
      })}
    </div>
  );
};
