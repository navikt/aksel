import { FilesIcon } from "@navikt/aksel-icons";
import { BodyShort, CopyButton } from "@navikt/ds-react";
import docs from "@navikt/ds-tokens/docs.json";
import Link from "next/link";
import color from "tinycolor2";
import { Grid } from "../Grid";
import { getColorString, getGlobalReference, sanitizeName } from "../utilities";

export const SemanticView = ({ cat }: { cat: string }) => {
  const colors = docs[cat];

  if (cat === "semantic-text") {
    return (
      <Grid>
        {colors.map((x) => {
          const ref = getGlobalReference(x.value);
          const c = color(x.value);
          const isLight = c.getLuminance() > 0.9;

          return (
            <div key={x.name} id={x.name} className="flex w-fit items-center">
              <div
                style={{
                  boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
                  background: isLight ? `var(--a-surface-inverted)` : undefined,
                }}
                className="group mr-3 grid h-12 w-12 place-content-center rounded-lg"
              >
                <CopyButton
                  variant="neutral"
                  copyText={x.name}
                  className="focus-visible:shadow-focus-gap rounded-lg opacity-100 focus-visible:opacity-100 "
                  icon={
                    <span className="text-2xl leading-none">
                      Aa <span className="sr-only">Kopier {x.name}</span>
                    </span>
                  }
                  style={{
                    color: x.value,
                  }}
                />
              </div>

              <BodyShort as="dl" size="small">
                <dt>{sanitizeName(x.name.replace("text-", ""))}</dt>
                <dd className="text-text-subtle ">
                  {ref ? (
                    <Link
                      href={`#${ref.name}`}
                      className="focus-visible:bg-border-focus focus-visible:text-text-on-action hover:underline focus:outline-none"
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
  }
  if (cat === "semantic-icon") {
    return (
      <Grid>
        {colors.map((x) => {
          const ref = getGlobalReference(x.value);
          const c = color(x.value);
          const isLight = c.getLuminance() > 0.9;

          return (
            <div key={x.name} id={x.name} className="flex w-fit items-center">
              <div
                style={{
                  boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
                  background: isLight ? `var(--a-surface-inverted)` : undefined,
                }}
                className="group mr-3 grid h-12 w-12 place-content-center rounded-lg"
              >
                <CopyButton
                  variant="neutral"
                  copyText={x.name}
                  className="focus-visible:shadow-focus-gap rounded-lg opacity-100 focus-visible:opacity-100 "
                  icon={<FilesIcon title={x.name} fontSize="1.5rem" />}
                  style={{
                    color: x.value,
                  }}
                />
              </div>

              <BodyShort as="dl" size="small">
                <dt>{sanitizeName(x.name.replace("icon-", ""))}</dt>
                <dd className="text-text-subtle ">
                  {ref ? (
                    <Link
                      href={`#${ref.name}`}
                      className="focus-visible:bg-border-focus focus-visible:text-text-on-action hover:underline focus:outline-none"
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
  }

  if (cat === "semantic-border" || cat === "semantic-data-border") {
    return (
      <Grid>
        {colors.map((x) => {
          const ref = getGlobalReference(x.value);

          return (
            <div key={x.name} id={x.name} className="flex w-fit items-center">
              <div
                style={{
                  boxShadow: `inset 0 0 0 3px var(${x.name})`,
                }}
                className="group mr-3 grid h-12 w-12 place-content-center rounded-lg"
              >
                <CopyButton
                  variant="neutral"
                  copyText={x.name}
                  className="focus-visible:shadow-focus-gap rounded-lg opacity-0 duration-0 focus-visible:opacity-100 group-hover:opacity-100 group-hover:transition-opacity"
                  icon={<FilesIcon title={x.name} fontSize="1.5rem" />}
                />
              </div>

              <BodyShort as="dl" size="small">
                <dt>{sanitizeName(x.name.replace("border-", ""))}</dt>
                <dd className="text-text-subtle ">
                  {ref ? (
                    <Link
                      href={`#${ref.name}`}
                      className="focus-visible:bg-border-focus focus-visible:text-text-on-action hover:underline focus:outline-none"
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
  }
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
                    className="focus-visible:bg-border-focus focus-visible:text-text-on-action hover:underline focus:outline-none"
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
