import React from "react";
import { Header } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { illustrationPictogram } from "./pictogram";
export default {
  title: "ds-react/header",
  component: Header,
} as Meta;

export const All = () => {
  return (
    <div>
      <h2>Header</h2>
      <Header description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE.">
        AUTE OFFICIA SINT SUNT FUGIAT
      </Header>
      <br />
      <h2>Header m/illustration</h2>
      <Header
        illustration={illustrationPictogram}
        description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE."
      >
        AUTE OFFICIA SINT SUNT FUGIAT
      </Header>
      <h2>Header center</h2>
      <Header
        description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE."
        variant="center"
      >
        AUTE OFFICIA SINT SUNT FUGIAT
      </Header>
      <h2>Header center m/illustration</h2>
      <Header
        illustration={illustrationPictogram}
        description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE."
        variant="center"
      >
        AUTE OFFICIA SINT SUNT FUGIAT
      </Header>
      <h2>Header variants</h2>
      <Header
        description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE."
        theme="guide"
      >
        AUTE OFFICIA SINT SUNT FUGIAT
      </Header>
      <Header
        description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE."
        theme="product"
      >
        AUTE OFFICIA SINT SUNT FUGIAT
      </Header>
      <Header
        description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE."
        theme="situation"
      >
        AUTE OFFICIA SINT SUNT FUGIAT
      </Header>
    </div>
  );
};
