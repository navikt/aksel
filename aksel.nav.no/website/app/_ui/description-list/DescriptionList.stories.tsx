import type { Meta, StoryFn } from "@storybook/nextjs-vite";
import { AkselDescriptionList } from "./DescriptionList";

// Temporary stories until we extract the component to @navikt/ds-react

const meta: Meta<typeof AkselDescriptionList> = {
  title: "Website-modules/DescriptionList",
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryFn = () => {
  return (
    <AkselDescriptionList
      items={[
        { label: "Navn", value: "Ola Nordmann" },
        { label: "Fødselsdato", value: "01.01.1990" },
        { label: "Adresse", value: "Storgata 1, 0001 Oslo" },
      ]}
    />
  );
};

export const Bold: StoryFn = () => {
  return (
    <AkselDescriptionList
      items={[
        { label: "Navn", value: "Ola Nordmann" },
        { label: "Fødselsdato", value: "01.01.1990" },
        { label: "Adresse", value: "Storgata 1, 0001 Oslo" },
      ]}
      variant="bold"
    />
  );
};

export const Horizontal: StoryFn = () => {
  return (
    <AkselDescriptionList
      items={[
        { label: "Navn", value: "Ola Nordmann" },
        { label: "Fødselsdato", value: "01.01.1990" },
        { label: "Adresse", value: "Storgata 1, 0001 Oslo" },
      ]}
      direction="horizontal"
    />
  );
};

export const HorizontalBold: StoryFn = () => {
  return (
    <AkselDescriptionList
      items={[
        { label: "Navn", value: "Ola Nordmann" },
        { label: "Fødselsdato", value: "01.01.1990" },
        { label: "Adresse", value: "Storgata 1, 0001 Oslo" },
      ]}
      direction="horizontal"
      variant="bold"
    />
  );
};

export const HorizontalBoldShort: StoryFn = () => {
  return (
    <AkselDescriptionList
      items={[
        { label: "xs", value: "320 px" },
        { label: "sm", value: "480 px" },
        { label: "md", value: "768 px" },
        { label: "lg", value: "1024 px" },
        { label: "xl", value: "1280 px" },
        { label: "2xl", value: "1440 px" },
      ]}
      direction="horizontal"
      variant="bold"
    />
  );
};
