import { Meta } from "@storybook/react";
import React from "react";
import { Box } from "../../@navikt/core/react/src/layout/box";
import { Page } from "../../@navikt/core/react/src/layout/page";
import {
  BodyLong,
  BodyShort,
  Heading,
} from "../../@navikt/core/react/src/typography";

const LAST_UPDATED = "03.02.2025";

const meta: Meta = {
  title: "Docs/Testing Darkside",

  parameters: {
    layout: "fullscreen",
    chromatic: { disable: true },
    docs: {
      page: null,
    },
  },
};
export default meta;

export const BecomeAPilotTeam = () => {
  return (
    <Box.New paddingBlock="space-48" asChild>
      <Page>
        <Page.Block width="md">
          <BodyShort as="time">{`Last update: ${LAST_UPDATED}`}</BodyShort>

          <Heading size="xlarge" as="h1" spacing>
            Become a pilot team
          </Heading>

          <BodyLong spacing>
            We are looking for pilot teams to test our new theming and design
            implementation, including darkmode. We are mainly looking for teams
            that are in the early stages of developing a new product or service.
            We want to test our system in a real-world scenario, and we need
            your help to do so.
          </BodyLong>

          <BodyLong spacing>
            As a pilot team, we want close communication with you to get
            feedback on the system. We want to know all the bad or unclear parts
            of our implementations, so that we can improve them incrementally.
          </BodyLong>
          <BodyLong spacing>
            Because of this, we would like you to contact us if you are
            interested in becoming a pilot team, so that we can keep connected
            and get your feedback.
          </BodyLong>
        </Page.Block>
        <Page.Block width="md">
          <Heading size="large" as="h2" spacing>
            Prerequisites
          </Heading>
          <BodyLong spacing>
            Adopting the new system will require some effort from your team,
            including the design and development side of things. We will try to
            provide you with the necessary tools and resources to get you going,
            but as this is still work in progress, some parts might still be
            rough around the edges.
          </BodyLong>
          <BodyLong spacing>
            Based on feedback, we will make changes as we go to the new system.
            This will include breaking changes and new features. We will keep
            you updated on these changes by updating a separate Changelog, but
            we cannot guarantee that we will be able to do so in all cases.
          </BodyLong>
        </Page.Block>

        <Page.Block width="md">
          <Heading size="large" as="h2" spacing>
            Tiers of testing and integration
          </Heading>
          <BodyLong spacing>
            When you become a pilot team, you will be able to integrate
            different levels of integration for the new system. In simpler
            terms, you can choose how much of the new system you want to use.
          </BodyLong>

          <Heading size="medium" as="h3" spacing>
            Figma
          </Heading>
          <BodyLong spacing>TODO: Write something about figma here</BodyLong>
          <Heading size="medium" as="h3" spacing>
            Design tokens
          </Heading>
          <BodyLong spacing>
            You can import our new tokens and use them in isolation without
            affecting the rest of your system. This allows you to experiment
            with new design-tokens and darkmode on your own terms without
            commiting to the update.
          </BodyLong>
          <Heading size="medium" as="h3" spacing>
            @navikt/ds-css
          </Heading>
          <BodyLong spacing>
            You can import our updated CSS package and use it in your project.
            This auto-imports the new design-tokens for you. You will{" "}
            <strong>not</strong> be able to use the old CSS package at the same
            time. This means that all custom overrides you have made for the old
            CSS will potentially break. The new CSS package now comes with
            built-in CSS-layers, this might affect your current based on custom
            overrides.
          </BodyLong>
          <BodyLong spacing>
            Using the new CSS-package in conjuntion with `@navikt/ds-react` will
            require you to update some components and us our new
            `Theme`-component. More on this in the next section.
          </BodyLong>
          <Heading size="medium" as="h3" spacing>
            @navikt/ds-react
          </Heading>
          <BodyLong spacing>
            To fasilitate the new update, our React-package now comes with a
            `Theme`-component. This component is required to use the new CSS and
            acts as a `Feature flag` internally. This means that you will have
            to wrap your application in a `Theme`-component to use the new
            system. Using this component, you can also change between
            `theme=light` and `theme=dark` when implementing theme-switching
            interally in your application.
          </BodyLong>
          <Heading size="small" as="h4" spacing>
            Breaking changes
          </Heading>
          <BodyLong spacing>
            Some `props` and components are not migrated (and will not be) to
            the new system. This means that you will have to update some
            components to test the new system. We will provide you with a list
            of components that are not migrated, and for the actual release we
            will have codemods and documentation ready to make this work as easy
            as possible.
          </BodyLong>
        </Page.Block>
      </Page>
    </Box.New>
  );
};

export const Setup = () => {
  return (
    <Box.New paddingBlock="space-48">
      <Page>
        <Page.Block width="md">
          <BodyShort as="time">{`Last update: ${LAST_UPDATED}`}</BodyShort>

          <Heading size="xlarge" as="h1" spacing>
            Become a pilot team
          </Heading>

          <BodyLong spacing>
            We are looking for pilot teams to test our new theming and design
            implementation, including darkmode. We are mainly looking for teams
            that are in the early stages of developing a new product or service.
            We want to test our system in a real-world scenario, and we need
            your help to do so.
          </BodyLong>

          <BodyLong spacing>
            As a pilot team, we want close communication with you to get
            feedback on the system. We want to know all the bad or unclear parts
            of our implementations, so that we can improve them incrementally.
          </BodyLong>
          <BodyLong spacing>
            Because of this, we would like you to contact us if you are
            interested in becoming a pilot team, so that we can keep connected
            and get your feedback.
          </BodyLong>
        </Page.Block>
        <Page.Block width="md">
          <Heading size="large" as="h2" spacing>
            Prerequisites
          </Heading>
          <BodyLong spacing>
            Adopting the new system will require some effort from your team,
            including the design and development side of things. We will try to
            provide you with the necessary tools and resources to get you going,
            but as this is still work in progress, some parts might still be
            rough around the edges.
          </BodyLong>
          <BodyLong spacing>
            Based on feedback, we will make changes as we go to the new system.
            This will include breaking changes and new features. We will keep
            you updated on these changes by updating a separate Changelog, but
            we cannot guarantee that we will be able to do so in all cases.
          </BodyLong>
        </Page.Block>
      </Page>
    </Box.New>
  );
};
