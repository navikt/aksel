import React from "react";
import { Loader } from "..";
import { Button } from "../..";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/loader",
  component: Loader,
} as Meta;

export const All = () => {
  return (
    <div>
      <h1>Loader</h1>
      <Loader />

      <h2>Transparent</h2>
      <Loader transparent />

      <h2>Sizing</h2>
      <Loader size="2xlarge" />
      <Loader size="xlarge" />
      <Loader size="large" />
      <Loader size="medium" />
      <Loader size="small" />
      <Loader size="xsmall" />
      <h2>Sizing transparent</h2>
      <Loader size="2xlarge" transparent />
      <Loader size="xlarge" transparent />
      <Loader size="large" transparent />
      <Loader size="medium" transparent />
      <Loader size="small" transparent />
      <Loader size="xsmall" transparent />
      <div style={{ backgroundColor: "#c9c9c9" }}>
        <h2>Varianter</h2>
        <Loader size="xlarge" variant="neutral" />
        <Loader size="xlarge" variant="interaction" />
        <Loader size="xlarge" variant="inverted" />
        <h2>Varianter transparent</h2>
        <Loader size="xlarge" variant="neutral" transparent />
        <Loader size="xlarge" variant="interaction" transparent />
        <Loader size="xlarge" variant="inverted" transparent />
      </div>
      <h2>Brukt i knapper</h2>
      <div>
        <Button>
          Laster...
          <Loader />
        </Button>
        <Button size="small">
          Laster...
          <Loader />
        </Button>
        <h2>Variants</h2>
        <Button variant="secondary">
          Laster...
          <Loader />
        </Button>
        <Button variant="action">
          Laster...
          <Loader />
        </Button>
        <Button variant="danger">
          Laster...
          <Loader />
        </Button>
      </div>
    </div>
  );
};
