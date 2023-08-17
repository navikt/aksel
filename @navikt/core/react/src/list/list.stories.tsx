import {
  BabyWrappedIcon,
  BrailleIcon,
  HeadHeartIcon,
  RecycleIcon,
} from "@navikt/aksel-icons";
import { Meta } from "@storybook/react";
import React from "react";
import { List, VStack } from "..";

export default {
  title: "ds-react/List",
  component: List,
} as Meta;

export const Default = {
  render: () => {
    return (
      <List>
        <List.Item title="Lorem Ipsum Dolor Sit Amet">
          Lorem Ipsum Dolor Sit Amet
        </List.Item>
        <List.Item title="Consectetur Adipiscing Elit">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Sed Do Eiusmod Tempor Incididunt">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
      </List>
    );
  },
};

export const Ordered = {
  render: () => {
    return (
      <List as="ol">
        <List.Item title="Lorem Ipsum Dolor Sit Amet">
          Lorem Ipsum Dolor Sit Amet
        </List.Item>
        <List.Item title="Consectetur Adipiscing Elit">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Sed Do Eiusmod Tempor Incididunt">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Ut Labore Et Dolore Magna Aliqua">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Enim Ad Minim Veniam">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Quis Nostrud Exercitation Ullamco">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Laboris Nisi Ut Aliquip Ex Ea Commodo">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Duis Aute Irure Dolor In Reprehenderit">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Voluptate Velit Esse Cillum Dolore">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Eu Fugiat Nulla Pariatur">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
      </List>
    );
  },
};

export const WithHeading = {
  render: () => {
    return (
      <List
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
      >
        <List.Item title="Lorem Ipsum Dolor Sit Amet">
          Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
        </List.Item>
        <List.Item title="Consectetur Adipiscing Elit">
          Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
        </List.Item>
        <List.Item title="Sed Do Eiusmod Tempor Incididunt">
          Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
        </List.Item>
      </List>
    );
  },
};

export const SizesUl = {
  render: () => {
    return (
      <VStack gap="8">
        <List
          title="Medium list"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
          size="medium"
        >
          <List.Item title="Lorem Ipsum Dolor Sit Amet">
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
          <List.Item title="Consectetur Adipiscing Elit">
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
          <List.Item>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
        </List>
        <List
          title="Small list"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
          size="small"
        >
          <List.Item title="Lorem Ipsum Dolor Sit Amet">
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
          <List.Item title="Consectetur Adipiscing Elit">
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
          <List.Item>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
        </List>
      </VStack>
    );
  },
};

export const SizesOl = {
  render: () => {
    return (
      <VStack gap="8">
        <List
          title="Medium list"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
          size="medium"
          as="ol"
        >
          <List.Item title="Lorem Ipsum Dolor Sit Amet">
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
          <List.Item title="Consectetur Adipiscing Elit">
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
          <List.Item>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
        </List>
        <List
          title="Small list"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
          size="small"
          as="ol"
        >
          <List.Item title="Lorem Ipsum Dolor Sit Amet">
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
          <List.Item title="Consectetur Adipiscing Elit">
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
          <List.Item>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
        </List>
      </VStack>
    );
  },
};

export const SizesIcons = {
  render: () => {
    return (
      <VStack gap="8">
        <List
          title="Medium list"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
          size="medium"
        >
          <List.Item
            icon={<HeadHeartIcon aria-hidden />}
            title="Lorem Ipsum Dolor Sit Amet"
          >
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
          <List.Item
            icon={<HeadHeartIcon aria-hidden />}
            title="Consectetur Adipiscing Elit"
          >
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
          <List.Item icon={<HeadHeartIcon aria-hidden />}>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
        </List>
        <List
          title="Small list"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
          size="small"
        >
          <List.Item
            icon={<HeadHeartIcon aria-hidden />}
            title="Lorem Ipsum Dolor Sit Amet"
          >
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
          <List.Item
            icon={<HeadHeartIcon aria-hidden />}
            title="Consectetur Adipiscing Elit"
          >
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
          <List.Item icon={<HeadHeartIcon aria-hidden />}>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </List.Item>
        </List>
      </VStack>
    );
  },
};

export const Icons = {
  render: () => {
    return (
      <List>
        <List.Item
          title="Lorem Ipsum Dolor Sit Amet"
          icon={<BrailleIcon aria-hidden />}
        >
          Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
        </List.Item>
        <List.Item
          title="Consectetur Adipiscing Elit"
          icon={<HeadHeartIcon aria-hidden />}
        >
          Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
        </List.Item>
        <List.Item icon={<BabyWrappedIcon aria-hidden />}>
          Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
        </List.Item>
        <List.Item icon={<RecycleIcon aria-hidden />}>
          Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
        </List.Item>
      </List>
    );
  },
};

export const Nested = {
  render: () => {
    return (
      <List>
        <List.Item title="Sed Do Eiusmod Tempor Incididunt">
          Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          <List>
            <List.Item title="Lorem Ipsum Dolor Sit Amet">
              Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
            </List.Item>
            <List.Item title="Consectetur Adipiscing Elit">
              Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
            </List.Item>
            <List.Item>
              Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
            </List.Item>
            <List.Item>
              Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
            </List.Item>
          </List>
        </List.Item>
        <List.Item>
          Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
        </List.Item>
      </List>
    );
  },
};
