import { useState } from "react";
import style from "./tabs.module.css";
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
    <ul className={style.ul}>
      {tabs.map((t, x) => (
        <li key={t + x} className={style.li}>
          <button
            className={cl(style.button, { [style.buttonActive]: x === tab })}
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
