import getConfig from "next/config";
import { useState } from "react";
import Tabs from "../tabs/Tabs";
import "./proptable.css";

const Proptable = ({
  names,
  defaultExport,
}: {
  names: string[];
  defaultExport?: string;
}) => {
  const [tab, setTab] = useState(0);
  const { publicRuntimeConfig } = getConfig();

  const props = publicRuntimeConfig.props
    .filter((comp) => [...names, defaultExport].includes(comp.displayName))
    .map((comp) => {
      if (comp.displayName === defaultExport) {
        return { ...comp, defaultExport: true };
      }
      return { ...comp, defaultExport: false };
    });

  return (
    <div>
      <Tabs
        tab={tab}
        onChange={(x) => setTab(x)}
        tabs={props.map((x) => x.displayName)}
      />
    </div>
  );
};

export default Proptable;
