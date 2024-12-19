import { CopyButton } from "@navikt/ds-react";
import docs from "@navikt/ds-tokens/docs.json";
import { Grid } from "../Grid";
import { getColorString, sanitizeName } from "../utilities";

export const GlobalView = ({ cat }: { cat: string }) => {
  const colors: { name: string; value: string }[] = docs[cat];
  return (
    <Grid>
      {colors.map((x) => {
        return (
          <div key={x.name} id={x.name} className="z-0 flex w-fit items-center">
            <div
              style={{
                background: `var(${x.name})`,
                boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
              }}
              className="mr-3 grid h-16 w-16 place-content-center rounded-lg"
            >
              <div className="component-checkered-bg z-[-1] h-16 w-16" />
            </div>
            <dl>
              <dt className="inline-flex items-start gap-1 text-medium">
                <span className="flex min-h-8 items-center">
                  {sanitizeName(x.name)}
                </span>
                <CopyButton
                  copyText={x.name}
                  title={`${sanitizeName(x.name)} kopier`}
                  size="small"
                />
              </dt>

              <dd className="mt-auto text-medium text-text-subtle">
                {getColorString(x.value)}
              </dd>
            </dl>
          </div>
        );
      })}
    </Grid>
  );
};
