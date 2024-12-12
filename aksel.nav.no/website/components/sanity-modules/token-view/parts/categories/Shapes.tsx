import { CopyButton } from "@navikt/ds-react";
import docs from "@navikt/ds-tokens/docs.json";
import { Grid } from "../Grid";
import { sanitizeName } from "../utilities";

export const ShapesView = ({ cat }: { cat: string }) => {
  const shapes = docs[cat];

  return (
    <Grid>
      {shapes.map((x) => {
        return (
          <div key={x.name} id={x.name} className="flex w-fit items-center">
            <div
              style={{ borderRadius: x.value }}
              className="mr-3 grid h-16 w-16 place-content-center rounded-lg bg-surface-alt-3-strong text-4xl leading-none"
            />
            <dl>
              <dt className="inline-flex items-start gap-1 text-medium">
                <span className="flex min-h-8 items-center">
                  {sanitizeName(x.name.replace("border-radius-", ""))}
                </span>
                <CopyButton
                  copyText={x.name}
                  title={`${sanitizeName(
                    x.name.replace("border-radius-", ""),
                  )} kopier`}
                  size="small"
                />
              </dt>

              <dd className="mt-auto text-medium text-text-subtle">
                {x.value}
              </dd>
            </dl>
          </div>
        );
      })}
    </Grid>
  );
};
