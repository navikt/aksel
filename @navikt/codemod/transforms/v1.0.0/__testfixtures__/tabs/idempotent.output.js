import { Tabs } from "@navikt/ds-react";

const TabComp = () => {
  return (
    /* prettier-ignore */
    <Tabs
      defaultValue="logg"
      onChange={(x) => console.log(x)}
      loop
      iconPosition="left">
      <Tabs.List>
        <Tabs.Tab value="logg" label="logg" />
        <Tabs.Tab value="logg2" label="logg2medlangtekst" />
      </Tabs.List>
      <Tabs.Panel value="logg">TabPanel for Logg-tab</Tabs.Panel>
      <Tabs.Panel value="logg2">TabPanel for Inbox-tab</Tabs.Panel>
    </Tabs>
  );
};
