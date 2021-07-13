import React from "react";
import { Loader } from "../index";
import { Button } from "../../index";
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
      <Loader size="2xl" />
      <Loader size="xl" />
      <Loader size="l" />
      <Loader size="m" />
      <Loader size="s" />
      <Loader size="xs" />
      <h2>Sizing transparent</h2>
      <Loader size="2xl" transparent />
      <Loader size="xl" transparent />
      <Loader size="l" transparent />
      <Loader size="m" transparent />
      <Loader size="s" transparent />
      <Loader size="xs" transparent />
    </div>
  );
};

export const LoaderInButton = () => (
  <div>
    <Button>
      Laster...
      <Loader />
    </Button>
    <Button size="s">
      Laster...
      <Loader />
    </Button>
    <h2>variants</h2>
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
);
