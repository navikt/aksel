import React from "react";
import { Header } from "../index";
import { Meta } from "@storybook/react/types-6-0";
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

/* prettier-ignore */
const illustrationPictogram = <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M37.6697 60.6469L9 31.9772L30.9772 10L59.6469 38.6697L72.1116 26.205L81 82L25.205 73.1116L37.6697 60.6469Z" fill="#FFECCC"/>
<path d="M94.5 64.0584C94.5 72.104 88.003 78.6169 80 78.6169C71.997 78.6169 65.5 72.104 65.5 64.0584C65.5 56.0129 71.997 49.5 80 49.5C88.003 49.5 94.5 56.0129 94.5 64.0584Z" stroke="#262626" stroke-width="3"/>
<path d="M91.9999 95.9999V95.9999C91.9999 89.3725 86.6274 83.9561 79.9999 83.9561V83.9561C73.3725 83.9561 67.9999 89.3725 67.9999 95.9999V95.9999" stroke="#262626" stroke-width="3"/>
<ellipse cx="76.0001" cy="63.5566" rx="2" ry="2.00731" fill="#262626"/>
<ellipse cx="84" cy="63.5566" rx="2" ry="2.00731" fill="#262626"/>
<path d="M29 29.488V30C29 25.0515 25.866 22 22 22C18.134 22 15 25.0515 15 30V29.488" stroke="#262626" stroke-width="3"/>
<circle cx="22" cy="15" r="5.5" stroke="#262626" stroke-width="3"/>
<rect x="1.5" y="1.5" width="41" height="56" stroke="#262626" stroke-width="3"/>
<path d="M10 37H27" stroke="#262626" stroke-width="3"/>
<path d="M10 47H18.5" stroke="#262626" stroke-width="3"/>
</svg>
