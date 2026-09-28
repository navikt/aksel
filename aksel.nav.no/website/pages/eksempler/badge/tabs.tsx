import {
  ClockDashedIcon,
  InboxDownIcon,
  PaperplaneIcon,
} from "@navikt/aksel-icons";
import { BodyShort, HStack, Tabs } from "@navikt/ds-react";
import { Badge } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Tabs defaultValue="logg">
      <Tabs.List>
        <Tabs.Tab
          value="logg"
          label="Logg"
          icon={<ClockDashedIcon aria-hidden />}
        />
        <Tabs.Tab
          value="inbox"
          label={
            <HStack align="center" gap="space-8">
              <BodyShort as="span">Inbox</BodyShort>
              <Badge count={5} data-color="accent" aria-label="5 ulest" />
            </HStack>
          }
          icon={<InboxDownIcon aria-hidden />}
        />
        <Tabs.Tab
          value="sendt"
          label="Sendt"
          icon={<PaperplaneIcon aria-hidden />}
        />
      </Tabs.List>
    </Tabs>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 6,
  desc: "Eksempel på bruk av Badge i Tabs.",
};
