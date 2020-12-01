import React, { useState } from "react";
import Tag from "../src/index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "@nav-frontend/react-tag",
  component: Tag,
} as Meta;

export const All = () => {
  return (
    <div>
      <Tag variant="info"> INFO tag</Tag>
      <Tag variant="focus"> focus tag</Tag>
      <Tag variant="success"> success tag</Tag>
      <Tag variant="warning"> Warning tag</Tag>
    </div>
  );
};
