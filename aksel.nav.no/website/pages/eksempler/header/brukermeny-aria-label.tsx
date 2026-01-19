import { LeaveIcon } from "@navikt/aksel-icons";
import {
  ActionMenu,
  BodyShort,
  Detail,
  InternalHeader,
  Spacer,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div style={{ minHeight: "8rem" }}>
      <InternalHeader>
        <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
        <Spacer />
        <ActionMenu>
          <ActionMenu.Trigger>
            <InternalHeader.UserButton
              name="Ola N."
              description="Enhet: Skien"
            />
          </ActionMenu.Trigger>
          <ActionMenu.Content align="end">
            <dl aria-label="Brukerinformasjon">
              <BodyShort as="dt" size="small">
                Ola Normann
              </BodyShort>
              <Detail as="dd">D123456</Detail>
            </dl>
            <ActionMenu.Divider />
            <ActionMenu.Item as="a" href="#">
              Logg ut
              <Spacer />
              <LeaveIcon aria-hidden />
            </ActionMenu.Item>
          </ActionMenu.Content>
        </ActionMenu>
      </InternalHeader>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Brukernavnet kan være en Dropdown som inneholder logg ut-lenke og info om brukeren (fullt navn, identnummer og eventuelt annen relevant info).",
};
