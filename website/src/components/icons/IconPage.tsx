import React, { useState } from "react";
import * as Icons from "@navikt/ds-icons";
import { Input } from "nav-frontend-skjema";
import "./styles.less";
import IconBox from "./IconBox";

const IconPage = () => {
  const [filter, setFilter] = useState("");

  const filteredIcons = Object.keys(Icons).filter(
    (name) => name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  );

  return (
    <div className="iconpage">
      <Input
        bredde="XL"
        label="Filter"
        description={filteredIcons.length + " ikoner matcher søket"}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="iconpage__icons">
        {filteredIcons.map((name) => (
          <IconBox key={name} name={name} />
        ))}
      </div>
    </div>
  );
};

export default IconPage;
