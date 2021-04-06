import React, { useState } from "react";
import Tabs from "../tabs/Tabs";
import style from "./preview.module.css";
import { renderToString } from "react-dom/server";
import Bash from "../code/Bash";
import Prettier from "prettier/standalone";
import ParserBabel from "prettier/parser-babel";

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
  const htmlFormat =
    !!children &&
    Prettier.format(
      renderToString(
        React.Children.count(children) > 1 ? <div>{children}</div> : children
      ),
      prettierOptions
    )
      .slice(0, -2)
      .replace(` data-reactroot=""`, "");

  const tabs = !hideHtml || !!children ? ["REACT", "HTML/CSS"] : ["REACT"];

  return (
    <div className={style.wrapper}>
      {!!children && <div className={style.preview}>{children}</div>}
      <Tabs tabs={tabs} tab={tab} onChange={(x) => handleChange(x)} />
      {tab === 0 && <Bash code={reactFormat} language="jsx" copy />}

      {(!hideHtml || !!children) && tab === 1 && (
        <Bash code={htmlFormat} language="jsx" copy />
      )}
    </div>
  );
};

export default Preview;
