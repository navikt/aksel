import React, { useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import Lenke from "../src/lenke";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Lenke",
  component: Lenke,
} as Meta;

export const All = () => {
  const lenkeref = useRef<any>();
  useEffect(() => {
    ReactDOM.findDOMNode(lenkeref.current).focus();
  });
  return (
    <div
      style={{
        display: "grid",
        gridAutoRows: "auto",
        rowGap: "2rem",
        gridAutoColumns: "max-content",
      }}
    >
      <Lenke href="#">Lenketekst default</Lenke>
      <Lenke href="#" ref={lenkeref}>
        Lenketekst fokusert
      </Lenke>
    </div>
  );
};
