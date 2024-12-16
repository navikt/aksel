import Link from "next/link";
import color from "tinycolor2";
import { PersonCircleIcon } from "@navikt/aksel-icons";
import { CopyButton } from "@navikt/ds-react";
import docs from "@navikt/ds-tokens/docs.json";
import { Grid } from "../Grid";
import { getColorString, getGlobalReference, sanitizeName } from "../utilities";

export const SemanticView = ({ cat }: { cat: string }) => {
  const colors = docs[cat];

  if (cat.startsWith("semantic-text")) {
    return (
      <Grid>
        {colors.map((token) => {
          const ref = getGlobalReference(token.value);
          const c = color(token.value);
          const isLight = c.getLuminance() > 0.9;

          const sanitizedName = sanitizeName(token.name.replace("text-", ""));

          return (
            <div
              key={token.name}
              id={token.name}
              className="flex w-fit items-center"
            >
              <div
                style={{
                  background: isLight ? `var(--a-surface-inverted)` : undefined,
                  color: token.value,
                  boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
                }}
                className="mr-3 grid h-16 w-16 place-content-center rounded-lg text-2xl leading-none"
              >
                Aa
              </div>
              <dl>
                <dt className="inline-flex items-start gap-1 text-medium">
                  <span className="flex min-h-8 items-center">
                    {sanitizedName}
                  </span>
                  <CopyButton
                    copyText={token.name}
                    title={`${sanitizedName} kopier`}
                    size="small"
                  />
                </dt>
                <dd className="mt-auto text-medium text-text-subtle">
                  {ref ? (
                    <Link
                      href={`#${ref.name}`}
                      className="hover:underline focus:outline-none focus-visible:bg-border-focus focus-visible:text-text-on-action"
                    >
                      {sanitizeName(ref.name)}
                    </Link>
                  ) : (
                    getColorString(token.value)
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
        {colors.map((token) => {
          const ref = getGlobalReference(token.value);
          const c = color(token.value);
          const isLight = c.getLuminance() > 0.9;

          const sanitizedName = sanitizeName(token.name.replace("icon-", ""));

          return (
            <div
              key={token.name}
              id={token.name}
              className="flex w-fit items-center"
            >
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
                    color: token.value,
                  }}
                />
              </div>
              <dl>
                <dt className="inline-flex items-start gap-1 text-medium">
                  <span className="flex min-h-8 items-center">
                    {sanitizedName}
                  </span>
                  <CopyButton
                    copyText={token.name}
                    title={`${sanitizedName} kopier`}
                    size="small"
                  />
                </dt>
                <dd className="mt-auto text-medium text-text-subtle">
                  {ref ? (
                    <Link
                      href={`#${ref.name}`}
                      className="hover:underline focus:outline-none focus-visible:bg-border-focus focus-visible:text-text-on-action"
                    >
                      {sanitizeName(ref.name)}
                    </Link>
                  ) : (
                    getColorString(token.value)
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
        {colors.map((token) => {
          const ref = getGlobalReference(token.value);

          const sanitizedName = sanitizeName(token.name.replace("border-", ""));

          return (
            <div
              key={token.name}
              id={token.name}
              className="flex w-fit items-center"
            >
              <div
                style={{
                  boxShadow: `inset 0 0 0 3px var(${token.name})`,
                }}
                className="mr-3 grid h-16 w-16 place-content-center rounded-lg text-4xl leading-none"
              />
              <dl>
                <dt className="inline-flex items-start gap-1 text-medium">
                  <span className="flex min-h-8 items-center">
                    {sanitizedName}
                  </span>
                  <CopyButton
                    copyText={token.name}
                    title={`${sanitizedName} kopier`}
                    size="small"
                  />
                </dt>
                <dd className="mt-auto text-medium text-text-subtle">
                  {ref ? (
                    <Link
                      href={`#${ref.name}`}
                      className="hover:underline focus:outline-none focus-visible:bg-border-focus focus-visible:text-text-on-action"
                    >
                      {sanitizeName(ref.name)}
                    </Link>
                  ) : (
                    getColorString(token.value)
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
        {colors.map((token) => {
          const ref = getGlobalReference(token.value);

          const sanitizedName = sanitizeName(
            token.name.replace("surface-", ""),
          );

          return (
            <div
              key={token.name}
              id={token.name}
              className="z-0 flex w-fit items-center"
            >
              <div className="mr-3 flex h-16 w-16 items-end justify-evenly rounded-lg text-4xl leading-none">
                <span
                  className="h-full w-3 rounded-t-small"
                  style={{
                    border: `1px solid var(${token.name})`,
                    backgroundColor: `var(${token.name.replace(
                      "border",
                      "surface",
                    )}-subtle)`,
                  }}
                />
                <span
                  className="h-2/4 w-3 rounded-t-small"
                  style={{
                    border: `1px solid var(${token.name})`,
                    backgroundColor: `var(${token.name.replace(
                      "border",
                      "surface",
                    )}-subtle)`,
                  }}
                />
                <span
                  className="h-2/3 w-3 rounded-t-small"
                  style={{
                    border: `1px solid var(${token.name})`,
                    backgroundColor: `var(${token.name.replace(
                      "border",
                      "surface",
                    )}-subtle)`,
                  }}
                />
              </div>
              <dl>
                <dt className="inline-flex items-start gap-1 text-medium">
                  <span className="flex min-h-8 items-center">
                    {sanitizedName}
                  </span>
                  <CopyButton
                    copyText={token.name}
                    title={`${sanitizedName} kopier`}
                    size="small"
                  />
                </dt>
                <dd className="mt-auto text-medium text-text-subtle">
                  {ref ? (
                    <Link
                      href={`#${ref.name}`}
                      className="hover:underline focus:outline-none focus-visible:bg-border-focus focus-visible:text-text-on-action"
                    >
                      {sanitizeName(ref.name)}
                    </Link>
                  ) : (
                    getColorString(token.value)
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
        {colors.map((token) => {
          const ref = getGlobalReference(token.value);

          const sanitizedName = sanitizeName(
            token.name.replace("surface-", ""),
          );

          return (
            <div
              key={token.name}
              id={token.name}
              className="z-0 flex w-fit items-center"
            >
              <div className="mr-3 flex h-16 w-16 items-end justify-evenly rounded-lg text-4xl leading-none">
                <span
                  className="h-full w-3 rounded-t-small"
                  style={{ backgroundColor: `var(${token.name})` }}
                />
                <span
                  className="h-2/4 w-3 rounded-t-small"
                  style={{ backgroundColor: `var(${token.name})` }}
                />
                <span
                  className="h-2/3 w-3 rounded-t-small"
                  style={{ backgroundColor: `var(${token.name})` }}
                />
              </div>
              <dl>
                <dt className="inline-flex items-start gap-1 text-medium">
                  <span className="flex min-h-8 items-center">
                    {sanitizedName}
                  </span>
                  <CopyButton
                    copyText={token.name}
                    title={`${sanitizedName} kopier`}
                    size="small"
                  />
                </dt>
                <dd className="mt-auto text-medium text-text-subtle">
                  {ref ? (
                    <Link
                      href={`#${ref.name}`}
                      className="hover:underline focus:outline-none focus-visible:bg-border-focus focus-visible:text-text-on-action"
                    >
                      {sanitizeName(ref.name)}
                    </Link>
                  ) : (
                    getColorString(token.value)
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
      {colors.map((token) => {
        const ref = getGlobalReference(token.value);

        const sanitizedName = sanitizeName(token.name.replace("surface-", ""));

        return (
          <div
            key={token.name}
            id={token.name}
            className="z-0 flex w-fit items-center"
          >
            <div
              style={{
                background: `var(${token.name})`,
                boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
              }}
              className="mr-3 grid h-16 w-16 place-content-center rounded-lg text-4xl leading-none"
            >
              <div className="component-checkered-bg z-[-1] h-16 w-16" />
            </div>
            <dl>
              <dt className="inline-flex items-start gap-1 text-medium">
                <span className="flex min-h-8 items-center">
                  {sanitizedName}
                </span>
                <CopyButton
                  copyText={token.name}
                  title={`${sanitizedName} kopier`}
                  size="small"
                />
              </dt>
              <dd className="mt-auto text-medium text-text-subtle">
                {ref ? (
                  <Link
                    href={`#${ref.name}`}
                    className="hover:underline focus:outline-none focus-visible:bg-border-focus focus-visible:text-text-on-action"
                  >
                    {sanitizeName(ref.name)}
                  </Link>
                ) : (
                  getColorString(token.value)
                )}
              </dd>
            </dl>
          </div>
        );
      })}
    </Grid>
  );
};
