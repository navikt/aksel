import React from "react";
import Tabs from ".";

/**
 * Dette eksempelet er inkludert for å vise begge måtene man kan
 * definere steg på:
 *  a) Som props
 *  b) Som children
 */

const TabsEksempel = () => (
  <div>
    <h3>Eksempel med props</h3>

    <Tabs
      tabs={[
        { label: "Første side" },
        { label: "Andre side" },
        { label: "Tredje side" },
      ]}
      onChange={() => {}}
    />

    <h3>Eksempel med children</h3>

    <Tabs onChange={() => {}}>
      <Tabs.Tab>Første side</Tabs.Tab>
      <Tabs.Tab>Andre side</Tabs.Tab>
      <Tabs.Tab>Tredje side</Tabs.Tab>
    </Tabs>
  </div>
);

export default TabsEksempel;
