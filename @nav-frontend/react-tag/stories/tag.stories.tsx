import React from "react";
import Tag from "../src/index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "@nav-frontend/react-tag",
  component: Tag,
} as Meta;

export const All = () => {
  return (
    <div>
      <h1>Standard</h1>
      <Tag variant="info"> info tag</Tag>
      <Tag variant="focus"> focus tag</Tag>
      <Tag variant="success"> success tag</Tag>
      <Tag variant="warning"> Warning tag</Tag>

      <h1>Small</h1>
      <Tag size="small" variant="info">
        info tag
      </Tag>
      <Tag size="small" variant="focus">
        focus tag
      </Tag>
      <Tag size="small" variant="success">
        success tag
      </Tag>
      <Tag size="small" variant="warning">
        Warning tag
      </Tag>
    </div>
  );
};
