import { Meta } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import { Search } from "../index";
export default {
  title: "ds-react/form/search",
  component: Search,
} as Meta;

export const All = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ maxWidth: 300 }}>
      <h1>Search</h1>
      <div>
        <Search
          label="Søk alle sider om X og Y"
          onSearch={console.log}
        ></Search>
        <br />
        <Search
          label="Søk alle sider om X og Y"
          onSearch={console.log}
          variant="primary"
        ></Search>
      </div>

      <h2>Search small</h2>
      <Search
        label="Søk alle sider om X og Y"
        description="Beskrivelse av søket"
        size="small"
      >
        <Search.Button />
      </Search>
      <br />
      <Search
        label="Søk alle sider om X og Y"
        description="Beskrivelse av søket"
        size="small"
        hideLabel
        variant="primary"
      >
        <Search.Button />
      </Search>

      <h2>Med knappe-tekst</h2>
      <Search label="Søk alle sider om X og Y" hideLabel={false}>
        <Search.Button>Søk</Search.Button>
      </Search>
      <Search
        label="Søk alle sider om X og Y"
        hideLabel={false}
        variant="primary"
      >
        <Search.Button>Søk</Search.Button>
      </Search>
      <h2>Hidelabel false</h2>
      <Search label="Søk alle sider om X og Y" hideLabel={false}>
        <Search.Button />
      </Search>
      <h2>Controlled state </h2>
      <Search
        value={value}
        label="Søk alle sider om X og Y"
        description="Beskrivelse av søket"
        onChange={(e) => setValue(e)}
        onClear={() => setValue("")}
      >
        <Search.Button />
      </Search>
      <h2>No clear button</h2>
      <Search
        hideLabel
        label="Søk alle sider om X og Y"
        description="Beskrivelse av søket"
        clearButton={false}
      >
        <Search.Button />
      </Search>
    </div>
  );
};

export const UUDemo = () => {
  return (
    <Search label="Søk på nav.no" onSearch={console.log} placeholder="Søk">
      <Search.Button />
    </Search>
  );
};
