import { FilesIcon } from "@navikt/aksel-icons";
import { BodyShort, CopyButton } from "@navikt/ds-react";
import docs from "@navikt/ds-tokens/docs.json";
import { sanitizeName, getColorString } from "../utilities";
import color from "tinycolor2";
import { Grid } from "../Grid";

export const GlobalView = ({ cat }: { cat: string }) => {
  const colors: { name: string; value: string }[] = docs[cat];
  return (
    <Grid>
      {colors.map((x) => {
        return (
          <div key={x.name} id={x.name} className="flex w-fit items-center">
            <div
              style={{
                background: `var(${x.name})`,
                boxShadow: `inset 0 2px 4px 0 rgba(0,0,0,0.06)`,
              }}
              className="group mr-3 grid h-12 w-12 place-content-center rounded-lg"
            >
              <CopyButton
                variant="neutral"
                copyText={x.name}
                className="focus-visible:shadow-focus-gap rounded-lg opacity-0 duration-0 focus-visible:opacity-100 group-hover:opacity-100 group-hover:transition-opacity"
                icon={<FilesIcon title={x.name} fontSize="1.5rem" />}
                style={{
                  color: color
                    .mostReadable(x.value, ["#fff", "#262626"])
                    .toHexString(),
                }}
              />
            </div>

            <BodyShort as="dl">
              <dt>{sanitizeName(x.name)}</dt>
              <dd className="text-text-subtle text-medium">
                {getColorString(x.value)}
              </dd>
            </BodyShort>
          </div>
        );
      })}
    </Grid>
  );
};
