import { useState } from "react";
import "./tabs.css";
import cl from "classnames";

interface TabsProps {
  onChange: (tab: number) => void;
  tabs: string[];
}

const Tabs = ({ onChange, tabs, ...props }: TabsProps) => {
  const [tab, setTab] = useState(0);

  const handleClick = (x: number) => {
    onChange(x);
    setTab(x);
  };

  return (
    <ul className={"tabs__ul"}>
      {tabs.map((t, x) => (
        <li key={t + x} className={"tabs__li"}>
          <button
            className={cl("tabs__button", { tabs__buttonActive: x === tab })}
            onClick={() => handleClick(x)}
          >
            {t}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
