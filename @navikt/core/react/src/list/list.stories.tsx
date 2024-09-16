import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  BrailleIcon,
  CheckmarkIcon,
  ForkIcon,
  HeadHeartIcon,
  SplitHorizontalIcon,
} from "@navikt/aksel-icons";
import { VStack } from "../layout/stack";
import { BodyLong } from "../typography";
import List from "./List";

export default {
  title: "ds-react/List",
  component: List,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof List>;

type Story = StoryObj<typeof List>;

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
        <List.Item>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto fugiat
          atque accusantium iure sunt, ipsum voluptas, impedit harum, minus
          rerum recusandae. Consequuntur sint distinctio nulla reprehenderit eum
          suscipit quae libero.
        </List.Item>
        <List.Item>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto fugiat
          atque accusantium iure sunt, ipsum voluptas, impedit harum, minus
          rerum recusandae. Consequuntur sint distinctio nulla reprehenderit eum
          suscipit quae libero.
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
      <List title="Best title">
        <List.Item
          title="Lorem Ipsum Dolor Sit Amet"
          icon={<BrailleIcon aria-hidden />}
        >
          Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
        </List.Item>
        <List.Item
          title="Consectetur Adipiscing Elit"
          icon={<ForkIcon aria-hidden />}
        >
          Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
        </List.Item>
        <List.Item icon={<CheckmarkIcon aria-hidden />}>
          Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
        </List.Item>
        <List.Item icon={<SplitHorizontalIcon aria-hidden />}>
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

export const Spacing = {
  render: () => {
    return (
      <>
        <h2>Medium</h2>
        <BodyLong spacing>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus
          aliquid, veniam quibusdam saepe autem quia odio? Tenetur dicta
          voluptates iste maiores perspiciatis? Sapiente in possimus iusto
          numquam? Esse, voluptatibus.
        </BodyLong>
        <List>
          <List.Item>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            fugiat atque accusantium iure sunt, ipsum voluptas, impedit harum,
            minus rerum recusandae. Consequuntur sint distinctio nulla
            reprehenderit eum suscipit quae libero.
          </List.Item>
          <List.Item>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            fugiat atque accusantium iure sunt, ipsum voluptas, impedit harum,
            minus rerum recusandae. Consequuntur sint distinctio nulla
            reprehenderit eum suscipit quae libero.
          </List.Item>
        </List>
        <BodyLong spacing>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus
          aliquid, veniam quibusdam saepe autem quia odio? Tenetur dicta
          voluptates iste maiores perspiciatis? Sapiente in possimus iusto
          numquam? Esse, voluptatibus.
        </BodyLong>
        <h2>Small</h2>
        <BodyLong size="small" spacing>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus
          aliquid, veniam quibusdam saepe autem quia odio? Tenetur dicta
          voluptates iste maiores perspiciatis? Sapiente in possimus iusto
          numquam? Esse, voluptatibus.
        </BodyLong>
        <List size="small">
          <List.Item>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            fugiat atque accusantium iure sunt, ipsum voluptas, impedit harum,
            minus rerum recusandae. Consequuntur sint distinctio nulla
            reprehenderit eum suscipit quae libero.
          </List.Item>
          <List.Item>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            fugiat atque accusantium iure sunt, ipsum voluptas, impedit harum,
            minus rerum recusandae. Consequuntur sint distinctio nulla
            reprehenderit eum suscipit quae libero.
          </List.Item>
        </List>
        <BodyLong size="small" spacing>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus
          aliquid, veniam quibusdam saepe autem quia odio? Tenetur dicta
          voluptates iste maiores perspiciatis? Sapiente in possimus iusto
          numquam? Esse, voluptatibus.
        </BodyLong>
      </>
    );
  },
};

export const Chromatic: Story = {
  render: () => (
    <VStack gap="2">
      <div>
        <h2>Default</h2>
        <Default.render />
      </div>
      <div>
        <h2>Ordered</h2>
        <Ordered.render />
      </div>
      <div>
        <h2>WithHeading</h2>
        <WithHeading.render />
      </div>
      <div>
        <h2>SizesUl</h2>
        <SizesUl.render />
      </div>
      <div>
        <h2>SizesOl</h2>
        <SizesOl.render />
      </div>
      <div>
        <h2>SizesIcons</h2>
        <SizesIcons.render />
      </div>
      <div>
        <h2>Icons</h2>
        <Icons.render />
      </div>
      <div>
        <h2>Nested</h2>
        <Nested.render />
      </div>
      <div>
        <h2>Spacing</h2>
        <Spacing.render />
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
