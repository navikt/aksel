import docs from "@navikt/ds-tokens/docs.json";

import { FilesIcon } from "@navikt/aksel-icons";
import { BodyShort, CopyButton } from "@navikt/ds-react";
import { Grid } from "../Grid";
import { sanitizeName } from "../utilities";
import cl from "clsx";

export const ZindexView = ({ cat }: { cat: string }) => {
  const zindex = docs[cat];
  /* <CopyButton
                variant="neutral"
                copyText={x.name}
                className="focus-visible:shadow-focus-gap  rounded-lg opacity-0 duration-0 focus-visible:opacity-100 group-hover:opacity-100 group-hover:transition-opacity"
                icon={<FilesIcon title={x.name} fontSize="1.5rem" />}
                style={{
                  borderRadius: `${x.value}`,
                  color: "var(--a-text-on-action)",
                }}
              /> */
  return (
    <Grid>
      {zindex.map((x, y) => {
        return (
          <div key={x.name} id={x.name} className="flex w-fit items-center">
            <div
              style={{
                boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
              }}
              className="bg-surface-subtle group relative mr-3 flex h-12 w-12 flex-col-reverse place-content-center justify-between overflow-hidden rounded-lg"
            >
              <CopyButton
                variant="neutral"
                copyText={x.name}
                className="focus-visible:shadow-focus-gap absolute z-10 rounded-lg opacity-0 duration-0 focus-visible:opacity-100 group-hover:opacity-100 group-hover:transition-opacity"
                icon={<FilesIcon title={x.name} fontSize="1.5rem" />}
                style={{
                  borderRadius: `${x.value}`,
                }}
              />
              {zindex.map((x, xi) => (
                <div
                  aria-hidden
                  key={x.value}
                  className={cl("h-2 w-12 group-hover:opacity-10", {
                    "bg-surface-alt-3-strong": y === xi,
                    "bg-surface-neutral-subtle": y !== xi,
                  })}
                />
              ))}
            </div>

            <BodyShort as="dl" size="small">
              <dt>{sanitizeName(x.name.replace("border-radius-", ""))}</dt>
              <dd className="text-text-subtle ">{x.value}</dd>
            </BodyShort>
          </div>
        );
      })}
    </Grid>
  );
  /* return (
    <Frame
      tokens={shapes}
      styles="borderRadius"
      element={({ token }: { token: string; name?: string }) => {
        return (
          <div
            className="min-h-16 flex h-full w-full items-end rounded-md px-4 text-5xl font-semibold"
            aria-hidden
            style={{
              background: `var(--a-surface-default)`,
            }}
          >
            {token}
          </div>
        );
      }}
    />
  ); */
};
