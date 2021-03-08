import React from "react";
import Panel from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Panel",
  component: Panel,
} as Meta;

export const All = () => {
  return (
    <div style={{ display: "grid", gridAutoRows: "8rem", rowGap: "4rem" }}>
      <Panel border>
        Deserunt ad ullamco qui cupidatat eu fugiat incididunt ex ea culpa sit
        consequat. Amet incididunt commodo incididunt voluptate do esse do
        fugiat duis. Sit voluptate reprehenderit voluptate amet excepteur
        incididunt exercitation sit pariatur amet exercitation duis ullamco.
        Tempor ipsum mollit cupidatat anim reprehenderit cupidatat velit. Do qui
        adipisicing consequat cillum qui et labore exercitation qui non. Elit
        voluptate et irure cupidatat ex velit mollit est cillum. Excepteur dolor
        sint deserunt in nulla fugiat cillum irure consectetur.
      </Panel>
      <Panel>
        Deserunt ad ullamco qui cupidatat eu fugiat incididunt ex ea culpa sit
        consequat. Amet incididunt commodo incididunt voluptate do esse do
        fugiat duis. Sit voluptate reprehenderit voluptate amet excepteur
        incididunt exercitation sit pariatur amet exercitation duis ullamco.
        Tempor ipsum mollit cupidatat anim reprehenderit cupidatat velit. Do qui
        adipisicing consequat cillum qui et labore exercitation qui non. Elit
        voluptate et irure cupidatat ex velit mollit est cillum. Excepteur dolor
        sint deserunt in nulla fugiat cillum irure consectetur.
      </Panel>
    </div>
  );
};
