import docs from "@navikt/ds-tokens/docs.json";
import { Grid } from "../Grid";
import { sanitizeName } from "../utilities";
import { CopyButton } from "@navikt/ds-react";

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
            <dl className="grid h-full">
              <dt className="inline-flex items-center gap-2">
                <CopyButton
                  text={sanitizeName(x.name.replace("shadow-", ""))}
                  copyText={x.name}
                  size="small"
                  iconPosition="right"
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
