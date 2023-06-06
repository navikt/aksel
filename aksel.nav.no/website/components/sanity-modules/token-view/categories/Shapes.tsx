import { FilesIcon } from "@navikt/aksel-icons";
import { BodyShort, CopyButton } from "@navikt/ds-react";
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
              style={{
                boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
                borderRadius: `${x.value}`,
              }}
              className="bg-surface-alt-3-strong group mr-3 grid h-12 w-12 place-content-center rounded-lg"
            >
              <CopyButton
                variant="neutral"
                copyText={x.name}
                className="focus-visible:shadow-focus-gap  rounded-lg opacity-0 duration-0 focus-visible:opacity-100 group-hover:opacity-100 group-hover:transition-opacity"
                icon={<FilesIcon title={x.name} fontSize="1.5rem" />}
                style={{
                  borderRadius: `${x.value}`,
                  color: "var(--a-text-on-action)",
                }}
              />
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
};
