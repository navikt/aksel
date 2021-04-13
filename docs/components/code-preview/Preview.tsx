import React, { useState } from "react";
import Tabs from "../tabs/Tabs";
import { renderToStaticMarkup } from "react-dom/server";
import Bash from "../code/Bash";
import Prettier from "prettier/standalone";
import ParserBabel from "prettier/parser-babel";
import "./preview.css";

const prettierOptions = {
  semi: true,
  parser: "babel",
  plugins: [ParserBabel],
  jsxBracketSameLine: false,
  printWidth: 30,
};

interface PreviewProps {
  react: string;
  children?: React.ReactElement;
  hideHtml?: boolean;
}

const Preview = ({
  children,
  react,
  hideHtml = false,
  ...props
}: PreviewProps) => {
  const [tab, setTab] = useState(0);
  const handleChange = (x: number) => {
    if (tab === x) {
      setTab(null);
    } else {
      setTab(x);
    }
  };

  const reactFormat = Prettier.format(react, prettierOptions).slice(0, -2);
  const htmlFormat = () =>
    !!children &&
    Prettier.format(
      renderToStaticMarkup(
        React.Children.count(children) > 1 ? <div>{children}</div> : children
      ),
      prettierOptions
    )
      .slice(0, -2)
      .replace(` data-reactroot=""`, "");

  const tabs = !hideHtml && !!children ? ["REACT", "HTML/CSS"] : ["REACT"];

  return (
    <div className={"preview__wrapper"}>
      {!!children && <div className={"preview__container"}>{children}</div>}
      <Tabs tabs={tabs} tab={tab} onChange={(x) => handleChange(x)} />
      {tab === 0 && <Bash code={reactFormat} language="jsx" copy />}

      {(!hideHtml || !!children) && tab === 1 && (
        <Bash
          code={process.browser ? htmlFormat() : `<div />`}
          language="jsx"
          copy
        />
      )}
    </div>
  );
};

export default Preview;
