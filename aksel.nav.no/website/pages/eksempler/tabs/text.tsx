import { withDsExample } from "@/web/examples/withDsExample";
import { Tabs } from "@navikt/ds-react";

const Example = () => {
  return (
    <Tabs defaultValue="logg">
      <Tabs.List>
        <Tabs.Tab value="logg" label="Logg" />
        <Tabs.Tab value="inbox" label="Inbox" />
        <Tabs.Tab value="sendt" label="Sendt" />
      </Tabs.List>
      <Tabs.Panel value="logg" className="h-24 w-full bg-gray-50 p-4">
        Logg-tab
      </Tabs.Panel>
      <Tabs.Panel value="inbox" className="h-24 w-full bg-gray-50 p-4">
        Inbox-tab
      </Tabs.Panel>
      <Tabs.Panel value="sendt" className="h-24  w-full bg-gray-50 p-4">
        Sendt-tab
      </Tabs.Panel>
    </Tabs>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
};
