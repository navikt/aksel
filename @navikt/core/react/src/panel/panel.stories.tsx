import React from "react";
import { Panel } from "../index";
import { Meta } from "@storybook/react";
export default {
  title: "ds-react/Panel",
  component: Panel,
  argTypes: {
    border: {
      defaultValue: true,
      control: {
        type: "boolean",
      },
    },
  },
} as Meta;

export const Default = (props) => {
  return (
    <Panel {...props}>
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
  );
};

export const Border = () => {
  return (
    <div className="colgap">
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
    </div>
  );
};
