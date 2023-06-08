import docs from "@navikt/ds-tokens/docs.json";
import cl from "clsx";
import { Copy } from "../Copy";
import { Grid } from "../Grid";
import { sanitizeName } from "../utilities";

export const ZindexView = ({ cat }: { cat: string }) => {
  const zindex = docs[cat];

  return (
    <Grid>
      {zindex.map((x, y) => {
        return (
          <div key={x.name} id={x.name} className="flex w-fit items-center">
            <div
              style={{ boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)` }}
              className="bg-surface-subtle mr-3 flex h-16 w-16 flex-col-reverse justify-between overflow-hidden rounded-lg text-4xl leading-none"
            >
              {zindex.map((x, xi) => (
                <div
                  aria-hidden
                  key={x.value}
                  className={cl(
                    "h-3 w-16 group-hover:opacity-10 peer-focus-visible:opacity-10",
                    {
                      "bg-surface-alt-3-strong": y === xi,
                      "bg-surface-neutral-subtle": y !== xi,
                    }
                  )}
                />
              ))}
            </div>
            <dl className="grid h-full">
              <dt className="inline-flex items-center gap-2">
                <Copy
                  text={sanitizeName(x.name.replace("z-index-", ""))}
                  copyText={x.name}
                />
              </dt>
              <dd className="text-text-subtle text-medium mt-auto">
                {x.value}
              </dd>
            </dl>
          </div>
        );
      })}
    </Grid>
  );
};
