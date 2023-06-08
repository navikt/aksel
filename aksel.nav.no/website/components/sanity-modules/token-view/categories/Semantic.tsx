import { PersonCircleIcon } from "@navikt/aksel-icons";
import docs from "@navikt/ds-tokens/docs.json";
import Link from "next/link";
import color from "tinycolor2";
import { Copy } from "../Copy";
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
                  background: isLight ? `var(--a-surface-inverted)` : undefined,
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
              <svg
                width="32"
                height="32"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
                role="img"
                className="z-[-1]"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.4942 5.33423C13.4927 5.3357 13.4913 5.33716 13.4898 5.33863L3.41421 15.4142C2.63317 16.1953 1.36684 16.1953 0.585787 15.4142C-0.195262 14.6332 -0.195263 13.3668 0.585785 12.5858L10.8987 2.27285C12.354 0.817568 14.3278 0 16.3859 0L40.24 5.49316e-06C44.5257 6.71387e-06 48 3.47427 48 7.76L48 31.6141C48 33.6722 47.1824 35.646 45.7271 37.1013L35.4142 47.4142C34.6332 48.1953 33.3668 48.1953 32.5858 47.4142C31.8047 46.6332 31.8047 45.3668 32.5858 44.5858L42.6632 34.5084C42.664 34.5075 42.6649 34.5067 42.6658 34.5058C43.9171 33.2544 43.9171 31.2256 42.6658 29.9742L18.0258 5.33423C16.7744 4.08287 14.7456 4.08287 13.4942 5.33423ZM44 25.6516L44 7.76C44 5.68341 42.3166 4.00001 40.24 4L22.3484 4L44 25.6516ZM21.4142 26.5858C22.1953 27.3668 22.1953 28.6332 21.4142 29.4142L3.41421 47.4142C2.63317 48.1953 1.36684 48.1953 0.585788 47.4142C-0.19526 46.6332 -0.19526 45.3668 0.585788 44.5858L18.5858 26.5858C19.3668 25.8048 20.6332 25.8048 21.4142 26.5858Z"
                  fill="var(--a-deepblue-50)"
                />
              </svg>
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
