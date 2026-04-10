import { StoryObj } from "@storybook/react-vite";
import React, { useMemo, useState } from "react";
import { VStack } from "../../primitives/stack";
import { DataTable } from "../table";
import { TokenFilter } from "./TokenFilter";
import type {
  ExternalPropertyDefinition,
  ExternalQuery,
} from "./TokenFilter.types";

export default {
  title: "ds-react/data/TokenFilter",
  component: TokenFilter,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

type Story = StoryObj<typeof TokenFilter>;

const properties = [
  {
    key: "status",
    label: "Status",
    groupLabel: "Status value",
    group: "Instance",
  },
  {
    key: "hostname",
    label: "Hostname",
    groupLabel: "Hostname value",
    group: "Instance",
  },
  {
    key: "instanceid",
    label: "Instance ID",
    groupLabel: "Instance ID value",
    group: "Instance",
  },
  {
    key: "region",
    label: "Region",
    groupLabel: "Region value",
    group: "Location",
  },
  {
    key: "availability_zone",
    label: "Availability Zone",
    groupLabel: "Availability Zone value",
    group: "Location",
  },
];

const propertiesWithoutGroups = properties.map((prop) => {
  const copy: {
    key: string;
    label: string;
    groupLabel: string;
    group?: string;
  } = structuredClone(prop);
  delete copy.group;
  return copy;
});

const propertyOptions = [
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

export const WithGroups: Story = {
  render: () => {
    const [query, setQuery] = useState<any>({
      tokens: [],
      operation: "and",
    });

    return (
      <div>
        <h2>TokenFilter with groups</h2>
        <TokenFilter
          query={query}
          onChange={(newQuery) => setQuery(newQuery)}
          options={propertyOptions}
          propertyDefinitions={properties}
        />
      </div>
    );
  },
};

export const WithOutGroups: Story = {
  render: () => {
    const [query, setQuery] = useState<any>({
      tokens: [],
      operation: "and",
    });

    return (
      <div>
        <h2>TokenFilter without groups</h2>
        <TokenFilter
          query={query}
          onChange={(newQuery) => setQuery(newQuery)}
          options={propertyOptions}
          propertyDefinitions={propertiesWithoutGroups}
        />
      </div>
    );
  },
};

export const MultipleTokens: Story = {
  render: () => {
    const [query, setQuery] = useState<any>({
      tokens: [],
      operation: "and",
    });

    console.log(query);

    return (
      <div>
        <h2>TokenFilter without groups</h2>
        <TokenFilter
          query={query}
          onChange={(newQuery) => setQuery(newQuery)}
          options={propertyOptions}
          propertyDefinitions={propertiesWithoutGroups}
        />
      </div>
    );
  },
};

const propertiesWithOperators: ExternalPropertyDefinition[] = [
  {
    key: "status",
    label: "Status",
    groupLabel: "Status value",
    group: "Instance",
    operators: [
      { operator: "=", type: "multiple" },
      { operator: "!=", type: "multiple" },
    ],
  },
  {
    key: "hostname",
    label: "Hostname",
    groupLabel: "Hostname value",
    group: "Instance",
    operators: ["=", "!="],
  },
  {
    key: "instanceid",
    label: "Instance ID",
    groupLabel: "Instance ID value",
    group: "Instance",
    operators: ["=", "!="],
  },
  {
    key: "region",
    label: "Region",
    groupLabel: "Region value",
    group: "Location",
    operators: [
      { operator: "=", type: "multiple" },
      { operator: "!=", type: "multiple" },
    ],
  },
  {
    key: "availability_zone",
    label: "Availability Zone",
    groupLabel: "Availability Zone value",
    group: "Location",
    operators: [
      { operator: "=", type: "multiple" },
      { operator: "!=", type: "multiple" },
      { operator: ":", type: "single" },
      { operator: "!:", type: "single" },
      { operator: "!:", type: "single" },
      { operator: "!^", type: "single" },
      { operator: "^", type: "single" },
    ],
  },
];

export const CustomOperators: Story = {
  render: () => {
    const [query, setQuery] = useState<any>({
      tokens: [],
      operation: "and",
    });

    return (
      <div>
        <h2>TokenFilter custom operators</h2>
        <TokenFilter
          query={query}
          onChange={(newQuery) => setQuery(newQuery)}
          options={propertyOptions}
          propertyDefinitions={propertiesWithOperators}
        />
      </div>
    );
  },
};

export const OperatorFiltering: Story = {
  render: () => {
    const [query, setQuery] = useState<any>({
      tokens: [
        {
          value: "stopped",
          propertyKey: "status",
          operator: "=",
        },
        {
          value: "prod-1",
          propertyKey: "hostname",
          operator: "!=",
        },
      ],
      operation: "and",
    });

    return (
      <div>
        <h2>Operator Filtering Demo</h2>
        <p>
          Try typing &quot;Status &quot; (with space) to see all operators, then
          type &quot;Status !&quot; to filter operators starting with
          &quot;!&quot;
        </p>
        <TokenFilter
          query={query}
          onChange={(newQuery) => setQuery(newQuery)}
          options={propertyOptions}
          propertyDefinitions={properties}
        />
        <div style={{ marginTop: "20px" }}>
          <h3>Test scenarios:</h3>
          <ul>
            <li>Empty input: Shows all properties</li>
            <li>&quot;Status &quot;: Shows operators for Status property</li>
            <li>&quot;Status !&quot;: Filters to !=, !:, !^ operators</li>
            <li>&quot;Status &gt;=&quot;: Shows only &gt;= operator</li>
            <li>&quot;Status = &quot;: Shows all Status values</li>
            <li>
              &quot;run&quot;: Shows filtered properties and values matching
              &quot;run&quot;
            </li>
          </ul>
        </div>
      </div>
    );
  },
};

const mixProperties = [
  {
    groupLabel: "Status values",
    group: "Metadata",
    key: "status",
    label: "Status",
  },
  {
    groupLabel: "Region values",
    group: "Location",
    key: "region",
    label: "Region",
  },
  {
    groupLabel: "Type values",
    group: "",
    key: "type",
    label: "Type",
  },
];

const statusOptions = [
  { propertyKey: "status", value: "active", label: "Active" },
  { propertyKey: "status", value: "pending", label: "Pending" },
  { propertyKey: "status", value: "inactive", label: "Inactive" },
];

const regionOptions = [
  {
    propertyKey: "region",
    value: "us-east-1",
    label: "US East",
    tags: ["north america", "usa"],
  },
  {
    propertyKey: "region",
    value: "eu-west-1",
    label: "EU West",
    tags: ["europe"],
  },
];

export const MixedGroups: Story = {
  render: () => {
    const [query, setQuery] = useState<any>({
      tokens: [],
      operation: "and",
    });

    return (
      <div>
        <h2>TokenFilter Mixed groups</h2>
        <TokenFilter
          query={query}
          onChange={(newQuery) => setQuery(newQuery)}
          options={[...statusOptions, ...regionOptions]}
          propertyDefinitions={mixProperties}
        />
      </div>
    );
  },
};

const servers = [
  { name: "web-prod-1", status: "running", region: "us-east-1", cpu: "12%" },
  { name: "web-prod-2", status: "running", region: "eu-west-1", cpu: "45%" },
  { name: "api-prod-1", status: "stopped", region: "us-east-1", cpu: "0%" },
  {
    name: "db-prod-1",
    status: "running",
    region: "ap-southeast-1",
    cpu: "78%",
  },
  { name: "worker-1", status: "pending", region: "eu-west-1", cpu: "3%" },
  { name: "api-dev-1", status: "stopping", region: "us-east-1", cpu: "5%" },
  { name: "web-dev-1", status: "running", region: "eu-west-1", cpu: "22%" },
];

const tablePropertyDefs = [
  {
    key: "status",
    label: "Status",
    groupLabel: "Status",
    operators: ["=", "!="],
  },
  {
    key: "region",
    label: "Region",
    groupLabel: "Region",
    operators: ["=", "!="],
  },
];

const tableOptions = [
  { propertyKey: "status", value: "running" },
  { propertyKey: "status", value: "stopped" },
  { propertyKey: "status", value: "stopping" },
  { propertyKey: "status", value: "pending" },
  { propertyKey: "region", value: "us-east-1" },
  { propertyKey: "region", value: "eu-west-1" },
  { propertyKey: "region", value: "ap-southeast-1" },
];

export const WithDataTable: Story = {
  render: () => {
    const [query, setQuery] = useState<ExternalQuery>({
      tokens: [],
      operation: "and",
    });

    const filtered = useMemo(() => {
      if (query.tokens.length === 0) return servers;

      return servers.filter((server) => {
        const results = query.tokens.map((token) => {
          const value = server[token.propertyKey as keyof typeof server];
          if (token.operator === "=") return value === token.value;
          if (token.operator === "!=") return value !== token.value;
          return true;
        });

        return query.operation === "and"
          ? results.every(Boolean)
          : results.some(Boolean);
      });
    }, [query]);

    return (
      <VStack gap="space-32">
        <TokenFilter
          query={query}
          onChange={setQuery}
          options={tableOptions}
          propertyDefinitions={tablePropertyDefs}
        />
        <DataTable zebraStripes layout="auto">
          <DataTable.Thead>
            <DataTable.Tr>
              <DataTable.Th>Name</DataTable.Th>
              <DataTable.Th>Status</DataTable.Th>
              <DataTable.Th>Region</DataTable.Th>
              <DataTable.Th>CPU</DataTable.Th>
            </DataTable.Tr>
          </DataTable.Thead>
          <DataTable.Tbody>
            {filtered.map((s) => (
              <DataTable.Tr key={s.name}>
                <DataTable.Td>{s.name}</DataTable.Td>
                <DataTable.Td>{s.status}</DataTable.Td>
                <DataTable.Td>{s.region}</DataTable.Td>
                <DataTable.Td>{s.cpu}</DataTable.Td>
              </DataTable.Tr>
            ))}
            {filtered.length === 0 && (
              <DataTable.Tr>
                <DataTable.Td colSpan={4}>No results</DataTable.Td>
              </DataTable.Tr>
            )}
          </DataTable.Tbody>
        </DataTable>
      </VStack>
    );
  },
};
