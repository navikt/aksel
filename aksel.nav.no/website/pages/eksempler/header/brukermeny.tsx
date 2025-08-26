import { LeaveIcon } from "@navikt/aksel-icons";
import {
  BodyShort,
  Detail,
  Dropdown,
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
        <Dropdown defaultOpen>
          <InternalHeader.UserButton
            as={Dropdown.Toggle}
            name="Ola N."
            description="Enhet: Skien"
          />
          <Dropdown.Menu>
            <dl>
              <BodyShort as="dt" size="small">
                Ola Normann
              </BodyShort>
              <Detail as="dd">D123456</Detail>
            </dl>
            <Dropdown.Menu.Divider />
            <Dropdown.Menu.List>
              <Dropdown.Menu.List.Item>
                Logg ut <Spacer /> <LeaveIcon aria-hidden fontSize="1.5rem" />
              </Dropdown.Menu.List.Item>
            </Dropdown.Menu.List>
          </Dropdown.Menu>
        </Dropdown>
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
