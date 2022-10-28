import { Email, Historic, Send } from "@navikt/ds-icons";
import { Tabs } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Tabs defaultValue="logg" size="small">
      <Tabs.List>
        <Tabs.Tab
          value="logg"
          label="Logg"
          icon={<Historic title="historielogg" />}
        />
        <Tabs.Tab value="inbox" label="Inbox" icon={<Email title="inbox" />} />
        <Tabs.Tab value="sendt" label="Sendt" icon={<Send title="sendt" />} />
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

export const args = {
  index: 1,
};
