import { FilesIcon } from "@navikt/aksel-icons";
import { BodyShort, CopyButton } from "@navikt/ds-react";
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
              className="group mr-4 grid h-12 w-12 place-content-center rounded-lg"
            >
              <CopyButton
                variant="neutral"
                copyText={x.name}
                className="focus-visible:shadow-focus-gap rounded-lg opacity-0 duration-0 focus-visible:opacity-100 group-hover:opacity-100 group-hover:transition-opacity"
                icon={<FilesIcon title={x.name} fontSize="1.5rem" />}
              />
            </div>

            <BodyShort as="dl" size="small">
              <dt>{sanitizeName(x.name.replace("shadow-", ""))}</dt>
              <dd className="text-text-subtle ">{x.value}</dd>
            </BodyShort>
          </div>
        );
      })}
    </Grid>
  );
};
