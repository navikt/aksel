import { StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { TokenFilter } from "./TokenFilter";

export default {
  title: "ds-react/data/TokenFilter",
  component: TokenFilter,
  parameters: {
    chromatic: { disable: true },
  },
};

type Story = StoryObj<typeof TokenFilter>;

const properties = [
  {
    key: "status",
    propertyLabel: "Status",
    groupValuesLabel: "Status value",
    group: "Instance",
  },
  {
    key: "hostname",
    propertyLabel: "Hostname",
    groupValuesLabel: "Hostname value",
    group: "Instance",
  },
  {
    key: "instanceid",
    propertyLabel: "Instance ID",
    groupValuesLabel: "Instance ID value",
    group: "Instance",
  },
  {
    key: "region",
    propertyLabel: "Region",
    groupValuesLabel: "Region value",
    group: "Location",
  },
  {
    key: "availability_zone",
    propertyLabel: "Availability Zone",
    groupValuesLabel: "Availability Zone value",
    group: "Location",
  },
];

const filteringOptions = [
  { propertyKey: "status", value: "running" },
  { propertyKey: "status", value: "stopped" },
  { propertyKey: "status", value: "stopping" },
  { propertyKey: "status", value: "pending" },
  { propertyKey: "hostname", value: "prod-1" },
  { propertyKey: "hostname", value: "prod-2" },
  { propertyKey: "hostname", value: "dev-1" },
  { propertyKey: "instanceid", value: "i-2dc5ce28a0328391" },
  { propertyKey: "instanceid", value: "i-d0312e022392efa0" },
  { propertyKey: "instanceid", value: "i-070eef935c1301e6" },
  { propertyKey: "region", value: "us-east-1" },
  { propertyKey: "region", value: "eu-west-1" },
  { propertyKey: "region", value: "ap-southeast-1" },
];

export const Default: Story = {
  render: () => {
    const [query, setQuery] = useState<any>({
      tokens: [],
      operation: "and",
    });

    return (
      <TokenFilter
        query={query}
        onChange={(newQuery) => setQuery(newQuery)}
        filteringProperties={properties}
        filteringOptions={filteringOptions}
      />
    );
  },
};
