import React from "react";
import PT from "prop-types";
import cn from "classnames";

import "NavFrontendModules/nav-frontend-tabell-style";

import OverflowDetector from "../overflow-detector/OverflowDetector";

import "./styles.less";

class PropTypeTable extends React.Component {
  render() {
    const propTypes = this.props.docgenInfo.props;
    const keys = Object.keys(propTypes).sort();
    const propTypeDocs = keys.map((key) => ({
      propName: key,
      ...propTypes[key],
    }));

    const headers = ["Property", "Type", "Required", "Description", "Default"];

    return (
      <OverflowDetector>
        <table
          className="tabell tabell--stripet"
          ref={(node) => {
            this.table = node;
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
                .filter((item) => item.propName.indexOf("aria-") !== 0)
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
  }
}

PropTypeTable.propTypes = {
  docgenInfo: PT.shape({
    props: PT.shape({}),
  }),
};

PropTypeTable.defaultProps = {
  docgenInfo: {
    props: {},
  },
};

export default PropTypeTable;

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
    <tr className={cn({ deprecated: typeof desc === "object" })}>
      <td>
        <strong>{parsePropValue(props.val.name)}</strong>
      </td>
      <td>
        <code className="inline">{parsePropValue(props.val.type)}</code>
      </td>
      <td>{parsePropValue(props.val.required)}</td>
      <td>{desc}</td>
      <td>{parsePropValue(props.val.defaultValue)}</td>
    </tr>
  );
};

PropTypeTableRow.propTypes = {
  val: PT.shape({
    // eslint-disable-next-line react/forbid-prop-types
    defaultValue: PT.any,
    description: PT.string,
    name: PT.string,
    propName: PT.string,
    required: PT.bool,
    // eslint-disable-next-line react/forbid-prop-types
    type: PT.any,
  }).isRequired,
};
