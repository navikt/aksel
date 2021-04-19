import React, { useState } from "react";
import Tabs from "../tabs/Tabs";
import { renderToStaticMarkup } from "react-dom/server";
import Bash from "../code/Bash";
import Prettier from "prettier/standalone";
import ParserBabel from "prettier/parser-babel";
import "./preview.css";
import OverflowDetector from "../overflow-detector/OverflowDetector";
import cl from "classnames";

const prettierOptions = {
  semi: true,
  parser: "babel",
  plugins: [ParserBabel],
  jsxBracketSameLine: true,
  printWidth: 60,
};

interface PreviewProps {
  react?: string;
  html?: React.ReactElement;
  children?: React.ReactElement;
  hideHtml?: boolean;
  defaultClosed?: boolean;
  noCode?: boolean;
}

const Preview = ({
  children,
  react,
  html,
  noCode,
  defaultClosed = false,
  hideHtml = false,
}: PreviewProps) => {
  const [tab, setTab] = useState(defaultClosed ? null : 0);
  const handleChange = (x: number) => {
    if (tab === x) {
      setTab(null);
    } else {
      setTab(x);
    }
  };

  const reactFormat =
    !noCode && Prettier.format(react, prettierOptions).slice(0, -2);
  const htmlFormat = () =>
    !noCode &&
    !!children &&
    !hideHtml &&
    Prettier.format(
      renderToStaticMarkup(
        html ??
          (React.Children.count(children) > 1 ? (
            <div>{children}</div>
          ) : (
            children
          ))
      ),
      prettierOptions
    )
      .slice(0, -2)
      .replace(` data-reactroot=""`, "");

  const tabs = !hideHtml && !!children ? ["REACT", "HTML/CSS"] : ["REACT"];

  return (
    <div className={"preview__wrapper"}>
      {!!children && (
        <div
          className={cl("preview__container", {
            "preview__container--no-code": noCode,
          })}
        >
          {children}
        </div>
      )}
      {!noCode && (
        <>
          <Tabs tabs={tabs} tab={tab} onChange={(x) => handleChange(x)} />
          {tab === 0 && <Bash code={reactFormat} language="jsx" copy />}

          {(!hideHtml || !!children) && tab === 1 && (
            <Bash
              code={process.browser ? htmlFormat() : `<div />`}
              language="jsx"
              copy
            />
          )}
        </>
      )}
    </div>
  );
};

export default Preview;
