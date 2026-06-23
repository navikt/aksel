import { ChevronDownIcon, PersonIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          variant="secondary"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Meny
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Gosys">
          <ActionMenu.Item onSelect={console.info} icon={<PersonIcon />}>
            Personoversikt
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} indent>
            Arbeidsgiveroversikt
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} indent>
            Samhandlere
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
  index: 13,
  desc: "Vi anbefaler å bruke innrykk på elementer uten markør som hører sammen hvor minst én av de andre elementene har markør. Dette for å tydeliggjøre at elementet hører til gruppen, og for å skape en visuell sammenheng mellom elementene i gruppen.",
};
