import { BodyLong, Heading } from "@navikt/ds-react";
import React from "react";
import * as Cards from "../generated-cards";

import allCards from "../cards.json";

export default {
  title: "ds-react-navno/Cards",
  argTypes: {
    card: {
      options: Object.entries(Cards).map(([Name, _]) => Name),
      control: {
        type: "select",
      },
    },
    customText: {
      control: { type: "text" },
    },
  },
  args: {
    card: "BarnepensjonCard",
  },
};

const Template = ({ card, customText, ...args }) => {
  const CardComponent = Cards[card];

  return (
    <>
      <Heading size="xlarge">Cards</Heading>
      <BodyLong spacing>
        Below are the three available card sizes that you may set using{" "}
        <i>size</i> prop. Use the Controls to view a particular card and its
        illustration.
      </BodyLong>
      <Heading size="xlarge" spacing>
        Usage
      </Heading>
      <BodyLong
        spacing
      >{`import { ${card} } from '@navikt/ds-navno'`}</BodyLong>
      <Heading size="xlarge" spacing>
        Large
      </Heading>
      <CardComponent
        {...args}
        size="large"
        href="http://www.nav.no"
        customText={customText}
      />
      <Heading size="xlarge" spacing>
        Mini
      </Heading>
      <CardComponent
        {...args}
        size="mini"
        href="http://www.nav.no"
        customText={customText}
      />
      <Heading size="xlarge" spacing>
        Micro
      </Heading>
      <CardComponent
        {...args}
        size="micro"
        href="http://www.nav.no"
        customText={customText}
      />
      <Heading size="xlarge" spacing>
        All cards
      </Heading>
      <BodyLong spacing>
        Below is a list of all cards available at the moment. If you are missing
        a card or you believe that a title is wrong, please contact us on{" "}
        <i>#team-personbruker</i> on Slack.
      </BodyLong>
      <Heading size="large" spacing>
        Product cards
      </Heading>
      <ul>
        {allCards
          .filter(({ type }) => type === "product")
          .map((card) => (
            <li>{card.componentName}Card</li>
          ))}
      </ul>
      <Heading size="large" spacing>
        Situation cards
      </Heading>
      <ul>
        {allCards
          .filter(({ type }) => type === "situation")
          .map((card) => (
            <li>{card.componentName}Card</li>
          ))}
      </ul>
    </>
  );
};

export const All = Template.bind({});
