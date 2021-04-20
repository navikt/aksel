import getConfig from "next/config";
import { useState } from "react";
import "./proptable.css";
import Inline from "../code/Inline";
import "nav-frontend-tabell-style";
import { Select } from "nav-frontend-skjema";
import Import from "../code/Import";

const Proptable = ({
  names,
  defaultExport,
  from,
}: {
  names: string[];
  defaultExport?: string;
  from: string;
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
    })
    .sort((a, b) => a.defaultValue === b.defaultValue);

  const headers = ["Prop", "Type", "Description"];

  const ProptableHeader = (props) => <th key={props.index}>{props.val}</th>;

  const parsePropValue = (val) => {
    if (val && typeof val === "object") {
      if (val.name === "enum") {
        return val.value.map((x) => x.value).join(" | ");
      }
      val = val.name || val.value; // eslint-disable-line no-param-reassign
    }
    if (val === null || typeof val === "undefined" || val.length <= 0) {
      return "-";
    }
    return val.toString();
  };

  const parseDescription = (desc) => {
    const found = desc.match(/^@deprecated/);
    if (found) {
      return (
        <span>
          <strong>{found[0]}</strong>
          {desc.substr(11, desc.length)}
        </span>
      );
    }
    return desc;
  };

  const PropTypeTableRow = (props) => {
    const desc = parseDescription(parsePropValue(props.val.description));
    return (
      <tr className="proptable__tr">
        <td>
          <div>
            <strong>{parsePropValue(props.val.name)}</strong>
          </div>
        </td>
        <td>
          <div>
            <Inline>{parsePropValue(props.val.type)}</Inline>
          </div>
        </td>
        {/* <td>
          <div>{parsePropValue(props.val.defaultValue)}</div>
        </td> */}
        <td>
          <div>{desc}</div>
        </td>
      </tr>
    );
  };

  return (
    <div className="proptable__wrapper">
      {/* <Preview noCode> */}
      <>
        <h3>Komponenter</h3>

        <Select
          onChange={(x) => setTab(Number(x.target.value))}
          label="Velg komponent"
        >
          {props.map((x, i) => (
            <option key={i + x} value={i}>
              {x.displayName}
            </option>
          ))}
        </Select>

        <Import
          from={from}
          imports={props[tab].displayName}
          namedExport={!props[tab].defaultExport}
        />
        <table className="tabell tabell--stripet proptable__table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <ProptableHeader val={header} index={index} key={index} />
              ))}
            </tr>
          </thead>
          <tbody>
            {props[tab].props
              .filter((item) => item.name.indexOf("aria-") !== 0)
              /* .sort((a, b) => a.name.localeCompare(b.name)) */
              .map((prop, key) => (
                <PropTypeTableRow
                  val={{
                    ...prop,
                    defaultValue: prop.defaultValue ? prop.defaultValue : "-",
                  }}
                  key={key}
                />
              ))}
          </tbody>
        </table>
      </>
      {/* </Preview> */}
    </div>
  );
};

export default Proptable;
