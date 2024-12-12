import { CopyButton } from "@navikt/ds-react";
import docs from "@navikt/ds-tokens/docs.json";
import { Grid } from "../Grid";
import { sanitizeName } from "../utilities";

export const ShadowView = ({ cat }: { cat: string }) => {
  const shadows = docs[cat];

  return (
    <Grid stacked>
      {shadows.map((x) => {
        return (
          <div key={x.name} id={x.name} className="flex w-fit items-center">
            <div
              style={{
                boxShadow: `var(${x.name})`,
              }}
              className="mr-3 grid h-16 w-16 place-content-center rounded-lg text-4xl leading-none"
            />
            <dl>
              <dt className="inline-flex items-start gap-1 text-medium">
                <span className="flex min-h-8 items-center">
                  {sanitizeName(x.name.replace("shadow-", ""))}
                </span>
                <CopyButton
                  copyText={x.name}
                  title={`${sanitizeName(
                    x.name.replace("shadow-", ""),
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
