import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { Panel } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/panel",
  component: Panel,
} as Meta;

export const All = () => {
  return (
    <div>
      <h1>Panel</h1>
      <Panel>
        Eu quis exercitation voluptate ex. Aute irure esse occaecat minim
        cupidatat velit minim duis sint culpa anim laboris. Consectetur nulla eu
        commodo ea culpa velit commodo incididunt sunt ipsum. Amet anim
        adipisicing minim ipsum do. Non laborum culpa reprehenderit est sint
        officia quis excepteur. Fugiat eiusmod eiusmod commodo incididunt nisi
        minim ex eu cupidatat quis ex. Lorem irure ea ea enim consectetur ea
        aliqua cupidatat. Officia aute veniam aute exercitation ipsum aliqua
        adipisicing. Est aliqua ad ullamco aute nostrud amet ea adipisicing
        consequat id officia irure pariatur. Eu mollit amet culpa culpa velit.
      </Panel>
      <h2>With border</h2>
      <Panel border>
        Eu quis exercitation voluptate ex. Aute irure esse occaecat minim
        cupidatat velit minim duis sint culpa anim laboris. Consectetur nulla eu
        commodo ea culpa velit commodo incididunt sunt ipsum. Amet anim
        adipisicing minim ipsum do. Non laborum culpa reprehenderit est sint
        officia quis excepteur. Fugiat eiusmod eiusmod commodo incididunt nisi
        minim ex eu cupidatat quis ex. Lorem irure ea ea enim consectetur ea
        aliqua cupidatat. Officia aute veniam aute exercitation ipsum aliqua
        adipisicing. Est aliqua ad ullamco aute nostrud amet ea adipisicing
        consequat id officia irure pariatur. Eu mollit amet culpa culpa velit.
      </Panel>
      <h2>Overridden</h2>
      <HashRouter>
        <Panel override>
          <Link to="yes">Overridden panel</Link>
        </Panel>
      </HashRouter>
    </div>
  );
};
