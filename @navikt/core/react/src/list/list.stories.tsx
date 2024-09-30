import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  BrailleIcon,
  CheckmarkIcon,
  ForkIcon,
  HeadHeartIcon,
  SplitHorizontalIcon,
} from "@navikt/aksel-icons";
import { Box } from "../layout/box";
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

export const Default: Story = {
  render: (props) => {
    return (
      <Box borderWidth="0 0 0 1" borderColor="border-subtle" maxWidth="500px">
        <List {...props}>
          <List.Item title="Lorem Ipsum Dolor Sit Amet">
            Lorem Ipsum Dolor Sit Amet
          </List.Item>
          <List.Item title="Consectetur Adipiscing Elit">
            Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
          </List.Item>
          <List.Item>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            fugiat atque accusantium iure sunt, ipsum voluptas, impedit harum,
            minus rerum recusandae.
          </List.Item>
          <List.Item>
            Impedit nemo eos sit adipisci non dolores.
            <List>
              <List.Item title="Tempor Incididunt">
                Error assumenda officia
              </List.Item>
              <List.Item>Suscipit odit voluptatum</List.Item>
            </List>
          </List.Item>
          <List.Item>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
            fugiat atque accusantium iure sunt, ipsum voluptas, impedit harum,
            minus rerum recusandae.
            <List as="ol">
              <List.Item title="Tempor Incididunt">
                Error assumenda officia
              </List.Item>
              <List.Item>Suscipit odit voluptatum</List.Item>
            </List>
          </List.Item>
        </List>
        <List {...props}>
          <List.Item>Liste 2, item 1</List.Item>
          <List.Item>Liste 2, item 2</List.Item>
        </List>
      </Box>
    );
  },
  args: {
    title: "",
    description: "",
  },
  argTypes: {
    size: { control: { type: "radio" }, options: ["small", "medium"] },
    as: { control: { type: "radio" }, options: ["ul", "ol"] },
  },
};

export const Test = () => (
  <>
    <h1>Test av nummerert liste</h1>
    <List as="ol">
      <List.Item>Brød</List.Item>
      <List.Item>Melk</List.Item>
      <List.Item title="Smør">Til å ha på brødskiva.</List.Item>
    </List>
  </>
);

export const Ordered: Story = {
  render: () => {
    return (
      <Box borderWidth="0 0 0 1" borderColor="border-subtle" maxWidth="500px">
        <p>Native liste:</p>
        <ol>
          <li>Neil Armstrong</li>
          <li>Alan Bean</li>
          <li>Peter Conrad</li>
        </ol>
        <p>Listekomponent:</p>
        <List as="ol">
          <List.Item title="Lorem Ipsum Dolor Sit Amet">Beskrivelse.</List.Item>
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
          <List.Item title="Quis Nostrud Exercitation Ullamco Eu Fugiat Nulla Pariatur Dolore">
            Beskrivelse på punktet i lista. Prøv å hold den kort og konsis. Men
            hvis den likevel blir lang, skal teksten brekke til flere linjer.
          </List.Item>
          <List.Item title="Laboris Nisi Ut Aliquip Ex Ea Commodo">
            Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
          </List.Item>
          <List.Item title="Duis Aute Irure Dolor In Reprehenderit">
            Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
          </List.Item>
          <List.Item>
            Impedit nemo eos sit adipisci non dolores.
            <List as="ol">
              <List.Item title="Tempor Incididunt">
                Error assumenda officia
              </List.Item>
              <List.Item>Suscipit odit voluptatum</List.Item>
            </List>
          </List.Item>
          <List.Item title="Voluptate Velit Esse Cillum Dolore">
            Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
            <List>
              <List.Item title="Tempor Incididunt">
                Error assumenda officia
              </List.Item>
              <List.Item>Suscipit odit voluptatum</List.Item>
            </List>
          </List.Item>
          <List.Item title="Eu Fugiat Nulla Pariatur">
            Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
          </List.Item>
        </List>
      </Box>
    );
  },
};

export const WithHeading: Story = {
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

export const SizesUl: Story = {
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

export const SizesOl: Story = {
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

export const SizesIcons: Story = {
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

export const Icons: Story = {
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

export const Spacing: Story = {
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
  render: (...args) => (
    <VStack gap="2">
      <div>
        <h2>Default</h2>
        {Default.render?.(...args)}
      </div>
      <div>
        <h2>Ordered</h2>
        {Ordered.render?.(...args)}
      </div>
      <div>
        <h2>WithHeading</h2>
        {WithHeading.render?.(...args)}
      </div>
      <div>
        <h2>SizesUl</h2>
        {SizesUl.render?.(...args)}
      </div>
      <div>
        <h2>SizesOl</h2>
        {SizesOl.render?.(...args)}
      </div>
      <div>
        <h2>SizesIcons</h2>
        {SizesIcons.render?.(...args)}
      </div>
      <div>
        <h2>Icons</h2>
        {Icons.render?.(...args)}
      </div>
      <div>
        <h2>Spacing</h2>
        {Spacing.render?.(...args)}
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
