import { PersonCircleIcon } from "@navikt/aksel-icons";
import docs from "@navikt/ds-tokens/docs.json";
import Link from "next/link";
import color from "tinycolor2";
import { Copy } from "../Copy";
import { Grid } from "../Grid";
import { getColorString, getGlobalReference, sanitizeName } from "../utilities";

export const SemanticView = ({ cat }: { cat: string }) => {
  const colors = docs[cat];

  if (cat.startsWith("semantic-text")) {
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
                  background: isLight ? `var(--a-surface-inverted)` : undefined,
                  color: x.value,
                  boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
                }}
                className="mr-3 grid h-16 w-16 place-content-center rounded-lg text-2xl leading-none"
              >
                Aa
              </div>
              <dl className="grid h-full">
                <dt className="inline-flex items-center gap-2">
                  <Copy
                    text={sanitizeName(x.name.replace("text-", ""))}
                    copyText={x.name}
                  />
                </dt>
                <dd className="text-text-subtle text-medium mt-auto">
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
              </dl>
            </div>
          );
        })}
      </Grid>
    );
  }
  if (cat.startsWith("semantic-icon")) {
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
                  background: isLight ? `var(--a-surface-inverted)` : undefined,
                  boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
                }}
                className="mr-3 grid h-16 w-16 place-content-center rounded-lg text-4xl leading-none"
              >
                <PersonCircleIcon
                  aria-hidden
                  style={{
                    color: x.value,
                  }}
                />
              </div>
              <dl className="grid h-full">
                <dt className="inline-flex items-center gap-2">
                  <Copy
                    text={sanitizeName(x.name.replace("icon-", ""))}
                    copyText={x.name}
                  />
                </dt>
                <dd className="text-text-subtle text-medium mt-auto">
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
              </dl>
            </div>
          );
        })}
      </Grid>
    );
  }

  if (cat.startsWith("semantic-border")) {
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
                className="mr-3 grid h-16 w-16 place-content-center rounded-lg text-4xl leading-none"
              />
              <dl className="grid h-full">
                <dt className="inline-flex items-center gap-2">
                  <Copy
                    text={sanitizeName(x.name.replace("border-", ""))}
                    copyText={x.name}
                  />
                </dt>
                <dd className="text-text-subtle text-medium mt-auto">
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
              </dl>
            </div>
          );
        })}
      </Grid>
    );
  }
  if (cat.startsWith("semantic-data-border")) {
    return (
      <Grid>
        {colors.map((x) => {
          const ref = getGlobalReference(x.value);

          return (
            <div
              key={x.name}
              id={x.name}
              className="z-0 flex w-fit items-center"
            >
              <div className="mr-3 flex h-16 w-16 items-end justify-evenly rounded-lg text-4xl leading-none">
                <span
                  className="rounded-t-small h-full w-3"
                  style={{
                    border: `1px solid var(${x.name})`,
                    backgroundColor: `var(${x.name.replace(
                      "border",
                      "surface"
                    )}-subtle)`,
                  }}
                />
                <span
                  className="rounded-t-small h-2/3 w-3"
                  style={{
                    border: `1px solid var(${x.name})`,
                    backgroundColor: `var(${x.name.replace(
                      "border",
                      "surface"
                    )}-subtle)`,
                  }}
                />
                <span
                  className="rounded-t-small h-1/3 w-3"
                  style={{
                    border: `1px solid var(${x.name})`,
                    backgroundColor: `var(${x.name.replace(
                      "border",
                      "surface"
                    )}-subtle)`,
                  }}
                />
              </div>
              <dl className="grid h-full">
                <dt className="inline-flex items-center gap-2">
                  <Copy
                    text={sanitizeName(x.name.replace("surface-", ""))}
                    copyText={x.name}
                  />
                </dt>
                <dd className="text-text-subtle text-medium mt-auto">
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
              </dl>
            </div>
          );
        })}
      </Grid>
    );
  }
  if (cat.startsWith("semantic-data-surface")) {
    return (
      <Grid>
        {colors.map((x) => {
          const ref = getGlobalReference(x.value);

          return (
            <div
              key={x.name}
              id={x.name}
              className="z-0 flex w-fit items-center"
            >
              <div className="mr-3 flex h-16 w-16 items-end justify-evenly rounded-lg text-4xl leading-none">
                <span
                  className="rounded-t-small h-full w-3"
                  style={{ backgroundColor: `var(${x.name})` }}
                />
                <span
                  className="rounded-t-small h-2/3 w-3"
                  style={{ backgroundColor: `var(${x.name})` }}
                />
                <span
                  className="rounded-t-small h-1/3 w-3"
                  style={{ backgroundColor: `var(${x.name})` }}
                />
              </div>
              <dl className="grid h-full">
                <dt className="inline-flex items-center gap-2">
                  <Copy
                    text={sanitizeName(x.name.replace("surface-", ""))}
                    copyText={x.name}
                  />
                </dt>
                <dd className="text-text-subtle text-medium mt-auto">
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
              </dl>
            </div>
          );
        })}
      </Grid>
    );
  }
  return (
    <Grid>
      {colors.map((x) => {
        const ref = getGlobalReference(x.value);

        return (
          <div key={x.name} id={x.name} className="z-0 flex w-fit items-center">
            <div
              style={{
                background: `var(${x.name})`,
                boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
              }}
              className="mr-3 grid h-16 w-16 place-content-center rounded-lg text-4xl leading-none"
            >
              <div className="component-checkered-bg z-[-1] h-16 w-16" />
            </div>
            <dl className="grid h-full">
              <dt className="inline-flex items-center gap-2">
                <Copy
                  text={sanitizeName(x.name.replace("surface-", ""))}
                  copyText={x.name}
                />
              </dt>
              <dd className="text-text-subtle text-medium mt-auto">
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
            </dl>
          </div>
        );
      })}
    </Grid>
  );
};
