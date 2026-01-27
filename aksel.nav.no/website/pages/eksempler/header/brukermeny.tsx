// eslint-disable-next-line aksel-local/import-check
import { useTheme } from "next-themes";
import { LeaveIcon } from "@navikt/aksel-icons";
import {
  ActionMenu,
  BodyShort,
  Detail,
  InternalHeader,
  Spacer,
  Theme,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const { resolvedTheme } = useTheme();
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
          <Theme theme={resolvedTheme as "light" | "dark"}>
            <ActionMenu.Content align="end">
              <ActionMenu.Label>
                <dl style={{ margin: "0" }}>
                  <BodyShort as="dt" size="small">
                    Ola Normann
                  </BodyShort>
                  <Detail as="dd">D123456</Detail>
                </dl>
              </ActionMenu.Label>
              <ActionMenu.Divider />
              <ActionMenu.Group aria-label="Handlinger">
                <ActionMenu.Item>
                  Logg ut <Spacer /> <LeaveIcon aria-hidden fontSize="1.5rem" />
                </ActionMenu.Item>
              </ActionMenu.Group>
            </ActionMenu.Content>
          </Theme>
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
  desc: "Brukernavnet kan være en ActionMenu som inneholder logg ut-lenke og info om brukeren (fullt navn, identnummer og eventuelt annen relevant info).",
  sandboxEnabled: false,
};
