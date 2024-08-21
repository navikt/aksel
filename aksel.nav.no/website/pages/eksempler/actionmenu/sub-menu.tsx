import { MenuElipsisHorizontalCircleIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div style={{ background: "var(--a-gray-50)", padding: "20rem" }}>
      <ActionMenu defaultOpen>
        <ActionMenu.Trigger>
          <Button
            variant="tertiary-neutral"
            icon={<MenuElipsisHorizontalCircleIcon title="Saksmeny" />}
            size="small"
          />
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Group label="Sak #1234">
            <ActionMenu.Item onSelect={console.log}>Ta sak</ActionMenu.Item>
            <ActionMenu.Sub>
              <ActionMenu.SubTrigger>Endre kategori</ActionMenu.SubTrigger>
              <ActionMenu.SubContent>
                <ActionMenu.Item onSelect={console.log}>
                  Venter på svar fra NAV
                </ActionMenu.Item>
                <ActionMenu.Item onSelect={console.log}>
                  Venter på svar fra bruker
                </ActionMenu.Item>
                <ActionMenu.Sub>
                  <ActionMenu.SubTrigger>Møte avtalt</ActionMenu.SubTrigger>
                  <ActionMenu.SubContent>
                    <ActionMenu.Group label="Når er møtet">
                      <ActionMenu.Item onSelect={console.log}>
                        I dag
                      </ActionMenu.Item>
                      <ActionMenu.Item onSelect={console.log}>
                        I morgen
                      </ActionMenu.Item>
                      <ActionMenu.Item onSelect={console.log}>
                        Om en uke
                      </ActionMenu.Item>
                    </ActionMenu.Group>
                  </ActionMenu.SubContent>
                </ActionMenu.Sub>
              </ActionMenu.SubContent>
            </ActionMenu.Sub>
            <ActionMenu.Sub>
              <ActionMenu.SubTrigger>
                Tildel saksbehandler
              </ActionMenu.SubTrigger>
              <ActionMenu.SubContent>
                <ActionMenu.Group label="Saksbehandlere">
                  <ActionMenu.Item onSelect={console.log}>
                    Ola Normann
                  </ActionMenu.Item>
                  <ActionMenu.Item onSelect={console.log}>
                    Bo Ramberg
                  </ActionMenu.Item>
                  <ActionMenu.Item onSelect={console.log} disabled>
                    Ole Olsen
                  </ActionMenu.Item>
                  <ActionMenu.Item onSelect={console.log} disabled>
                    Janne Nilssen
                  </ActionMenu.Item>
                  <ActionMenu.Item onSelect={console.log}>
                    Karin Jakobsen
                  </ActionMenu.Item>
                  <ActionMenu.Item onSelect={console.log}>
                    Kari Nordmann
                  </ActionMenu.Item>
                </ActionMenu.Group>
              </ActionMenu.SubContent>
            </ActionMenu.Sub>

            <ActionMenu.Separator />
            <ActionMenu.Item variant="danger" onSelect={console.log}>
              Slett oppgave
            </ActionMenu.Item>
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Undermenyer lar deg forenklet komplekse grensesnitt og filter ved å flytte innholdet til en godt strukturert meny. Vi anbefaler på det meste to nivåer med undermenyer.",
};
