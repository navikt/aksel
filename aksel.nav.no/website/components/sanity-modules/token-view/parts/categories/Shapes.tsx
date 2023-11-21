import docs from "@navikt/ds-tokens/docs.json";
import { Grid } from "../Grid";
import { sanitizeName } from "../utilities";
import { CopyButton } from "@navikt/ds-react";

export const ShapesView = ({ cat }: { cat: string }) => {
  const shapes = docs[cat];

  return (
    <Grid>
      {shapes.map((x) => {
        return (
          <div key={x.name} id={x.name} className="flex w-fit items-center">
            <div
              style={{ borderRadius: x.value }}
              className="bg-surface-alt-3-strong mr-3 grid h-16 w-16 place-content-center rounded-lg text-4xl leading-none"
            />
            <dl className="grid h-full">
              <dt className="inline-flex items-center gap-2">
                <CopyButton
                  text={sanitizeName(x.name.replace("border-radius-", ""))}
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
