import React from "react";
import { PageHeader } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { illustrationPictogram } from "./pictogram";
export default {
  title: "ds-react/page-header",
  component: PageHeader,
} as Meta;

export const All = () => {
  return (
    <div>
      <h2>PageHeader</h2>
      <PageHeader description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE.">
        AUTE OFFICIA SINT SUNT FUGIAT
      </PageHeader>
      <br />
      <h2>PageHeader m/illustration</h2>
      <PageHeader
        illustration={illustrationPictogram}
        description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE."
      >
        AUTE OFFICIA SINT SUNT FUGIAT
      </PageHeader>
      <h2>PageHeader center</h2>
      <PageHeader
        description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE."
        variant="center"
      >
        AUTE OFFICIA SINT SUNT FUGIAT
      </PageHeader>
      <h2>PageHeader center m/illustration</h2>
      <PageHeader
        illustration={illustrationPictogram}
        description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE."
        variant="center"
      >
        AUTE OFFICIA SINT SUNT FUGIAT
      </PageHeader>
      <h2>PageHeader variants</h2>
      <PageHeader
        description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE."
        theme="guide"
      >
        AUTE OFFICIA SINT SUNT FUGIAT
      </PageHeader>
      <PageHeader
        description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE."
        theme="product"
      >
        AUTE OFFICIA SINT SUNT FUGIAT
      </PageHeader>
      <PageHeader
        description="LABORIS AUTE DESERUNT ID AUTE OFFICIA SINT SUNT FUGIAT EX ET CUPIDATAT CONSEQUAT DOLORE."
        theme="situation"
      >
        AUTE OFFICIA SINT SUNT FUGIAT
      </PageHeader>
    </div>
  );
};
