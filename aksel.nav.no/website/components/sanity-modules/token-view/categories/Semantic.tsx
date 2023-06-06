import { FilesIcon } from "@navikt/aksel-icons";
import { BodyShort, CopyButton } from "@navikt/ds-react";
import docs from "@navikt/ds-tokens/docs.json";
import { sanitizeName, getGlobalReference, getColorString } from "../utilities";
import { Grid } from "../Grid";
import { PersonCircleIcon } from "@navikt/aksel-icons";
import color from "tinycolor2";
import { Frame } from "../Frame";
import Link from "next/link";

export const SemanticView = ({ cat }: { cat: string }) => {
  const colors = docs[cat];

  if (cat === "semantic-text") {
    return (
      <Frame
        tokens={colors}
        styles="color"
        showHex
        element={({ token }: { token: string }) => {
          const c = color(token);
          const isLigth = c.getLuminance() > 0.9;

          return (
            <div
              className="min-h-16 flex h-full w-full items-end rounded-md px-4 text-5xl font-semibold"
              aria-hidden
              style={{
                color: token,
                background: isLigth
                  ? `var(--a-surface-inverted)`
                  : `var(--a-surface-default)`,
              }}
            >
              Aa
            </div>
          );
        }}
      />
    );
  }
  if (cat === "semantic-icon") {
    return (
      <Frame
        tokens={colors}
        styles="color"
        showHex
        element={({ token }: { token: string }) => {
          const c = color(token);
          const isLigth = c.getLuminance() > 0.9;

          return (
            <div
              className="min-h-16 flex h-full w-full items-center justify-center rounded-md px-4 text-4xl font-semibold"
              aria-hidden
              style={{
                color: token,
                background: isLigth
                  ? `var(--a-surface-inverted)`
                  : `var(--a-surface-default)`,
              }}
            >
              <PersonCircleIcon aria-hidden />
            </div>
          );
        }}
      />
    );
  }

  if (cat === "semantic-border" || cat === "semantic-data-border") {
    return (
      <Frame
        tokens={colors}
        styles="color"
        showHex
        element={({ token }: { token: string }) => {
          const c = color(token);
          const isLigth = c.getLuminance() > 0.7;

          return (
            <div
              className="min-h-16 flex h-full w-full items-center justify-center rounded-md px-4 text-5xl font-semibold"
              aria-hidden
              style={{
                background: isLigth
                  ? `var(--a-surface-inverted)`
                  : `var(--a-surface-default)`,
              }}
            >
              <div
                className="h-12 w-full rounded-md"
                style={{
                  border: `2px solid ${token}`,
                }}
              />
            </div>
          );
        }}
      />
    );
  }
  console.log(colors);
  return (
    <Grid>
      {colors.map((x) => {
        const c = color(x.value);
        const ref = getGlobalReference(x.value);

        return (
          <div key={x.name} id={x.name} className="flex w-fit items-center">
            <div
              style={{
                background: `var(${x.name})`,
                boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
              }}
              className="group mr-3 grid h-12 w-12 place-content-center rounded-lg"
            >
              <CopyButton
                variant="neutral"
                copyText={x.name}
                className="focus-visible:shadow-focus-gap rounded-lg opacity-0 duration-0 focus-visible:opacity-100 group-hover:opacity-100 group-hover:transition-opacity"
                icon={<FilesIcon title={x.name} fontSize="1.5rem" />}
                style={{
                  color:
                    c.getAlpha() === 1
                      ? color
                          .mostReadable(x.value, ["#fff", "#262626"])
                          .toHexString()
                      : "var(--a-text-default)",
                }}
              />
            </div>

            <BodyShort as="dl" size="small">
              <dt>{sanitizeName(x.name.replace("surface-", ""))}</dt>
              <dd className="text-text-subtle ">
                {ref ? (
                  <Link
                    href={`#${ref.name}`}
                    className="focus-visible:bg-border-focus hover:underline focus:outline-none"
                  >
                    {sanitizeName(ref.name)}
                  </Link>
                ) : (
                  getColorString(x.value)
                )}
              </dd>
            </BodyShort>
          </div>
        );
      })}
    </Grid>
  );
};
