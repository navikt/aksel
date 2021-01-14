import React from "react";
import Tag from "../src/index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "@navikt/tag",
  component: Tag,
} as Meta;

export const All = () => {
  return (
    <div>
      <h1>Tag</h1>
      <Tag variant="info"> Info tag</Tag>
      <Tag variant="warning"> Warning tag</Tag>
      <Tag variant="success"> Success tag</Tag>
      <Tag variant="error">Error tag</Tag>
    </div>
  );
};
