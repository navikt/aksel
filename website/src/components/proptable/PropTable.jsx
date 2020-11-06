import React, { useRef } from "react";
import PT from "prop-types";
import cn from "classnames";

import "nav-frontend-tabell-style";

import OverflowDetector from "../overflow-detector/OverflowDetector";

import "./styles.less";

const PropTable = ({ moduleProps, ...props }) => {
  const propTypes = moduleProps.props;
  const keys = Object.keys(propTypes).sort();
  const propTypeDocs = keys.map((key) => ({
    propName: key,
    ...propTypes[key],
  }));

  const table = useRef();
  const headers = ["Property", "Type", "Default", "Required", "Description"];

  return (
    <OverflowDetector>
      <table
        className="tabell tabell--stripet"
        ref={(node) => {
          table.current = node;
        }}
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <PropTypeTableHeader val={header} index={index} key={index} />
            ))}
          </tr>
        </thead>
        <tbody>
          {
            // eslint-disable-next-line max-len
            propTypeDocs
              .filter((item) => item.name.indexOf("aria-") !== 0)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((propTypeDoc, key) => (
                <PropTypeTableRow
                  val={{
                    ...propTypeDoc,
                    defaultValue: propTypeDoc.defaultValue
                      ? propTypeDoc.defaultValue
                      : "-",
                  }}
                  key={key} // eslint-disable-line react/no-array-index-key
                />
              ))
          }
        </tbody>
      </table>
    </OverflowDetector>
  );
};

export default PropTable;

const PropTypeTableHeader = (props) => <th key={props.index}>{props.val}</th>;

PropTypeTableHeader.propTypes = {
  index: PT.number.isRequired,
  val: PT.string.isRequired,
};

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
    <tr
      className={cn("proptable__tr", { deprecated: typeof desc === "object" })}
    >
      <td>
        <div>
          <strong>{parsePropValue(props.val.name)}</strong>
        </div>
      </td>
      <td>
        <div>
          <code className="inline">{parsePropValue(props.val.type)}</code>
        </div>
      </td>
      <td>
        <div>{parsePropValue(props.val.defaultValue)}</div>
      </td>
      <td>
        <div>{props.val.required ? "✅" : "❌"}</div>
      </td>
      <td>
        <div>{desc}</div>
      </td>
    </tr>
  );
};
