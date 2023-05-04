import { Tabs } from "@navikt/ds-react";

const TabComp = () => {
  return (
    /* prettier-ignore */
    <div>
      <Tabs
        defaultValue="logg"
        onChange={(x) => console.log(x)}
        {...testProps}
        loop={false}
        iconPosition={props.left}>
        <Tabs.List {...testProps}>
          <Tabs.Tab value="logg" label="logg" {...testProps} />
          <Tabs.Tab value="logg2" label="logg2medlangtekst" />
        </Tabs.List>
        <Tabs.Panel value="logg">TabPanel for Logg-tab</Tabs.Panel>
        <Tabs.Panel value="logg2">TabPanel for Inbox-tab</Tabs.Panel>
      </Tabs>
      <Tabs defaultValue="logg" onChange={(x) => console.log(x)}>
        <Tabs.List>
          <Tabs.Tab value="logg" label="logg" />
          <Tabs.Tab value="logg2" label="logg2medlangtekst" />
        </Tabs.List>
        <Tabs.Panel value="logg">TabPanel for Logg-tab</Tabs.Panel>
        <Tabs.Panel value="logg2">TabPanel for Inbox-tab</Tabs.Panel>
      </Tabs>
    </div>
  );
};
