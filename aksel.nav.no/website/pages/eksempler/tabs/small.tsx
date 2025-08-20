import {
  ClockDashedIcon,
  InboxDownIcon,
  PaperplaneIcon,
} from "@navikt/aksel-icons";
import { Box, Tabs } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Tabs defaultValue="logg" size="small">
      <Tabs.List>
        <Tabs.Tab
          value="logg"
          label="Logg"
          icon={<ClockDashedIcon aria-hidden />}
        />
        <Tabs.Tab
          value="inbox"
          label="Inbox"
          icon={<InboxDownIcon aria-hidden />}
        />
        <Tabs.Tab
          value="sendt"
          label="Sendt"
          icon={<PaperplaneIcon aria-hidden />}
        />
      </Tabs.List>
      <Tabs.Panel value="logg">
        <Box width="100%" height="6rem" padding="space-16">
          Logg-tag
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="inbox">
        <Box width="100%" height="6rem" padding="space-16">
          Inbox-tag
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="sendt">
        <Box width="100%" height="6rem" padding="space-16">
          Sendt-tag
        </Box>
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
  index: 1,
};
