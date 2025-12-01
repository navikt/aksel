import { ChevronDownIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          variant="secondary-neutral"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Meny
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Systemer og oppslagsverk">
          <ActionMenu.Item onSelect={console.info}>A-inntekt</ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>
            Aa-registeret
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>Gosys</ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>
            Modia Sykefraværsoppfølging
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>
            Modia Personoversikt
          </ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
