import {
  ClockDashedIcon,
  InboxDownIcon,
  PaperplaneIcon,
} from "@navikt/aksel-icons";
import { Tabs } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Tabs defaultValue="logg" iconPosition="top">
      <Tabs.List>
        <Tabs.Tab
          value="logg"
          label="Logg"
          icon={<ClockDashedIcon title="historielogg" aria-hidden />}
        />
        <Tabs.Tab
          value="inbox"
          label="Inbox"
          icon={<InboxDownIcon title="inbox" aria-hidden />}
        />
        <Tabs.Tab
          value="sendt"
          label="Sendt"
          icon={<PaperplaneIcon title="sendt" aria-hidden />}
        />
      </Tabs.List>
      <Tabs.Panel value="logg" className="h-24 w-full bg-gray-50 p-4">
        Logg-tab
      </Tabs.Panel>
      <Tabs.Panel value="inbox" className="h-24 w-full bg-gray-50 p-4">
        Inbox-tab
      </Tabs.Panel>
      <Tabs.Panel value="sendt" className="h-24 w-full bg-gray-50 p-4">
        Sendt-tab
      </Tabs.Panel>
    </Tabs>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
