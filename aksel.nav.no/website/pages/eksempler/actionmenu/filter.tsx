import React from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [views, setViews] = React.useState({
    started: true,
    fnr: false,
    tags: true,
  });
  const [rows, setRows] = React.useState<string>("5");

  const handleCheckboxChange = (checkboxId: string) => {
    setViews((prevState) => ({
      ...prevState,
      [checkboxId]: !prevState[checkboxId],
    }));
  };

  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          variant="secondary-neutral"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Filter
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Kolonner">
          <ActionMenu.CheckboxItem
            checked={
              Object.values(views).every(Boolean)
                ? true
                : Object.values(views).some(Boolean)
                  ? "indeterminate"
                  : false
            }
            onCheckedChange={() => {
              const allChecked = Object.values(views).every(Boolean);
              setViews((prevState) =>
                Object.keys(prevState).reduce(
                  (acc, key) => {
                    acc[key] = !allChecked;
                    return acc;
                  },
                  {} as typeof views,
                ),
              );
            }}
          >
            Velg alle
          </ActionMenu.CheckboxItem>
          <ActionMenu.CheckboxItem
            checked={views.started}
            onCheckedChange={() => handleCheckboxChange("started")}
          >
            Oppfølging startet
          </ActionMenu.CheckboxItem>
          <ActionMenu.CheckboxItem
            checked={views.fnr}
            onCheckedChange={() => handleCheckboxChange("fnr")}
          >
            Fødselsnummer
          </ActionMenu.CheckboxItem>
          <ActionMenu.CheckboxItem
            checked={views.tags}
            onCheckedChange={() => handleCheckboxChange("tags")}
          >
            Tags
          </ActionMenu.CheckboxItem>
        </ActionMenu.Group>
        <ActionMenu.Divider />
        <ActionMenu.RadioGroup
          onValueChange={setRows}
          value={rows}
          label="Rader per side"
        >
          <ActionMenu.RadioItem value="5">5</ActionMenu.RadioItem>
          <ActionMenu.RadioItem value="10">10</ActionMenu.RadioItem>
          <ActionMenu.RadioItem value="25">25</ActionMenu.RadioItem>
          <ActionMenu.RadioItem value="50">50</ActionMenu.RadioItem>
        </ActionMenu.RadioGroup>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
  minHeight: "18rem",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Med CheckboxItem og RadioItem i ActionMenu er det enkelt å lage et filter for tabeller eller andre komplekse grensesnitt.",
};
