import { useTheme } from "next-themes";
import { MenuGridIcon } from "@navikt/aksel-icons";
import { ActionMenu, InternalHeader, Spacer, Theme } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ minHeight: "14rem" }}>
      <InternalHeader>
        <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
        <Spacer />
        <ActionMenu>
          <ActionMenu.Trigger>
            <InternalHeader.Button>
              <MenuGridIcon
                style={{ fontSize: "1.5rem" }}
                title="Systemer og oppslagsverk"
              />
            </InternalHeader.Button>
          </ActionMenu.Trigger>
          <Theme theme={resolvedTheme as "light" | "dark"}>
            <ActionMenu.Content align="end">
              <ActionMenu.Group label="Systemer og oppslagsverk">
                <ActionMenu.Item
                  as="a"
                  target="_blank"
                  href="#"
                  rel="noreferrer noopener"
                >
                  A.Inntekt
                </ActionMenu.Item>
                <ActionMenu.Item
                  as="a"
                  target="_blank"
                  href="#"
                  rel="noreferrer noopener"
                >
                  Aa-registeret
                </ActionMenu.Item>
                <ActionMenu.Item
                  as="a"
                  target="_blank"
                  href="#"
                  rel="noreferrer noopener"
                >
                  Gosys
                </ActionMenu.Item>
                <ActionMenu.Item
                  as="a"
                  target="_blank"
                  href="#"
                  rel="noreferrer noopener"
                >
                  Modia personoversikt
                </ActionMenu.Item>
                <ActionMenu.Item
                  as="a"
                  target="_blank"
                  href="#"
                  rel="noreferrer noopener"
                >
                  Oppdrag
                </ActionMenu.Item>
              </ActionMenu.Group>
            </ActionMenu.Content>
          </Theme>
        </ActionMenu>
        <InternalHeader.User name="Ola Normann" />
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
  index: 4,
  title: "App-meny",
  desc: "App-menyen inneholder lenker til andre interne systemer.",
  sandbox: false,
};
