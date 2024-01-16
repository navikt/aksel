import { CopyButton } from "@navikt/ds-react";
import docs from "@navikt/ds-tokens/docs.json";
import cl from "clsx";
import { Grid } from "../Grid";
import { sanitizeName } from "../utilities";

export const ZindexView = ({ cat }: { cat: string }) => {
  const zindex = docs[cat] as { name: string; value: number }[];

  return (
    <Grid>
      {zindex.map((token, index) => {
        return (
          <div
            key={token.name}
            id={token.name}
            className="flex w-fit items-center"
          >
            <div
              style={{ boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)` }}
              className="mr-3 flex h-16 w-16 flex-col-reverse justify-between overflow-hidden rounded-lg bg-surface-subtle text-4xl leading-none"
            >
              {zindex.map((token2, index2) => (
                <div
                  aria-hidden
                  key={token2.value}
                  className={cl(
                    "h-3 w-16 group-hover:opacity-10 peer-focus-visible:opacity-10",
                    {
                      "bg-surface-alt-3-strong": index === index2,
                      "bg-surface-neutral-subtle": index !== index2,
                    },
                  )}
                />
              ))}
            </div>
            <dl className="grid h-full">
              <dt className="inline-flex items-center gap-2">
                <CopyButton
                  text={sanitizeName(token.name.replace("z-index-", ""))}
                  copyText={token.name}
                  size="small"
                  iconPosition="right"
                />
              </dt>
              <dd className="mt-auto text-medium text-text-subtle">
                {token.value}
              </dd>
            </dl>
          </div>
        );
      })}
    </Grid>
  );
};
