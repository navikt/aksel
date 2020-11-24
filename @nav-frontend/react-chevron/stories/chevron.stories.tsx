import React, { useState } from "react";
import Chevron from "../src/index";

export default {
  title: "@nav-frontend/react-chevron",
  component: Chevron,
};

export const All = () => {
  const [dir, setDir] = useState("up");

  const changeDir = () => {
    const dirs = ["up", "down", "left", "right"];
    setDir(dirs[dirs.indexOf(dir) + 1] || dirs[0]);
  };

  return (
    <>
      <h1>Default</h1>
      <Chevron />
      <h1>Chevrons</h1>
      <Chevron variant="down" />
      <Chevron variant="up" />
      <Chevron variant="left" />
      <Chevron variant="right" />
      <br />
      <button onClick={() => changeDir()}>Change dir</button>
      <br />
      <Chevron variant={dir as any} />
    </>
  );
};
