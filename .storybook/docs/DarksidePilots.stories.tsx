import { Meta } from "@storybook/react";
import React from "react";
import { Box } from "../../@navikt/core/react/src/layout/box";
import { Page } from "../../@navikt/core/react/src/layout/page";
import { Table } from "../../@navikt/core/react/src/table";
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
    <Box.New paddingBlock="space-48" asChild className="darkside-docs">
      <Page>
        <Page.Block width="md" gutters>
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
        <Page.Block width="md" gutters>
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

        <Page.Block width="md" gutters>
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
            commiting to the update. You can also go all-inn on our new system,
            and import the old tokens so that migrating from legacy-code is
            easier.
          </BodyLong>
          <Heading size="medium" as="h3" spacing>
            Tailwind CSS
          </Heading>
          <BodyLong spacing>
            Our new tokens are all avaliable for use in Tailwind CSS. As far as
            we have tested, most of the new tokens can be used in isolation
            without affecting the old tokens. There will be some tokens that
            overlap and might cause issues, but we dont have a list of these
            yet.
          </BodyLong>
          <BodyLong spacing>
            The new config is based on CSS-variables, so when using TailwindCSS
            v3, you can not change opacity on the fly. If using TailwindCSS v4,
            this should now be possible. As a side-effect for using tokens, you
            will now be required to import our tokens seperatly for tailwind to
            work. You can either import the tokens standalone, or get them as a
            passenger trough the CSS-package.
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
    <Box.New paddingBlock="space-48" asChild className="darkside-docs">
      <Page>
        <Page.Block width="md" gutters>
          <BodyShort as="time">{`Last update: ${LAST_UPDATED}`}</BodyShort>

          <Heading size="xlarge" as="h1" spacing>
            Setup
          </Heading>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="large" as="h2" spacing>
            Clean project install
          </Heading>
          <BodyLong spacing>
            <pre className="docs-pre">
              <code className="docs-code">{`// index.tsx
import "@navikt/ds-tokens/darkside-css";
import { Theme } from "@navikt/ds-react";

<Theme theme="light">
  <App />
</Theme>`}</code>
            </pre>
            Thats it, you are now using our new design tokens, CSS and updated
            React-code.
          </BodyLong>
          <Heading size="large" as="h2" spacing>
            Installation for existing projects
          </Heading>
          <BodyLong spacing>
            Here you have the basics to test the new system inn already existing
            projects. We provide more in-depth guides for each part in the
            sidebar.
          </BodyLong>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="large" as="h2" spacing>
            Design tokens
          </Heading>
          <Heading size="medium" as="h3" spacing>
            Import-paths
          </Heading>
          <pre className="docs-pre">
            <code className="docs-code">{`@navikt/ds-tokens/darkside-css
@navikt/ds-tokens/darkside-scss
@navikt/ds-tokens/darkside-less
@navikt/ds-tokens/darkside-js`}</code>
          </pre>
          <BodyLong spacing>
            The design-tokens are avaliable in multiple formats. You can import
            them in your project by using the import-paths above. All of these
            formats are based on CSS-variables to support theming and darkmode.
          </BodyLong>
          <BodyLong spacing weight="semibold">
            Note: If using SCSS, LESS or JS, you will also have to import the
            CSS-version of the tokens or they will not work.
          </BodyLong>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="large" as="h2" spacing>
            @navikt/ds-tailwind
          </Heading>
          <Heading size="medium" as="h3" spacing>
            Import-paths
          </Heading>
          <pre className="docs-pre">
            <code className="docs-code">@navikt/ds-tailwind/darkside</code>
          </pre>
          <BodyLong spacing>
            Replace the old <code>@navikt/ds-tailwind</code>-import with the
            above in your config, and you now have the new tailwind-config in
            your project.
          </BodyLong>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="large" as="h2" spacing>
            @navikt/ds-css
          </Heading>
          <Heading size="medium" as="h3" spacing>
            Import-paths
          </Heading>
          <pre className="docs-pre">
            <code className="docs-code">@navikt/ds-css/darkside</code>
          </pre>
          <BodyLong spacing>
            Replace the old <code>@navikt/ds-css</code>-import with the above,
            and you now have the new CSS-package in your project. Note that for
            this to work in conjunction with <code>@navikt/ds-react</code>, you
            will have to wrap your application in a <code>Theme</code>
            -component.
          </BodyLong>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="large" as="h2" spacing>
            @navikt/ds-react
          </Heading>
          <pre className="docs-pre">
            <code className="docs-code">
              {`import { Theme } from '@navikt/ds-react';

// Light mode
<Theme theme="light">
  <App />
</Theme>

// Dark mode
<Theme theme="dark">
  <App />
</Theme>`}
            </code>
          </pre>
          <BodyLong spacing>
            Wrap your application in a <code>Theme</code>-component to use the
            new system. This component is required to use the new CSS and acts
            as a <code>Feature flag</code> internally. Using this component, you
            can also change between <code>theme=light</code> and{" "}
            <code>theme=dark</code> when implementing theme-switching interally
            in your application.
          </BodyLong>
        </Page.Block>
      </Page>
    </Box.New>
  );
};

export const TokenPackage = () => {
  return (
    <Box.New paddingBlock="space-48" asChild className="darkside-docs">
      <Page>
        <Page.Block width="md" gutters>
          <BodyShort as="time">{`Last update: ${LAST_UPDATED}`}</BodyShort>

          <Heading size="xlarge" as="h1" spacing>
            @navikt/ds-tokens
          </Heading>
        </Page.Block>

        <Page.Block width="md" gutters>
          <BodyLong spacing>
            All of these tokens are subject to change, and based on feedback we
            will have to make changes as we go. We will update the changelog
            after each update to keep track.
          </BodyLong>
          <Heading size="large" as="h2" spacing>
            Setup
          </Heading>
          <pre className="docs-pre">
            <code className="docs-code">
              {`@import "@navikt/ds-tokens/darkside-css";`}
            </code>
          </pre>

          <BodyLong spacing weight="semibold">
            Note: Since new tokens uses a different prefix, you can start using
            the new tokens in your project without breaking the old tokens. This
            will allow you to test the new tokens in isolation and migrate when
            you are ready.
          </BodyLong>

          <Heading size="medium" as="h3" spacing>
            Other formats
          </Heading>

          <BodyLong spacing>
            The design-tokens are avaliable in multiple formats. You can import
            them in your project by using the import-paths above. All of these
            formats are based on CSS-variables to support theming and darkmode.
          </BodyLong>
          <BodyLong spacing weight="semibold">
            Note: If using SCSS, LESS or JS, you will also have to import the
            CSS-version of the tokens or they will not work.
          </BodyLong>
          <pre className="docs-pre">
            <code className="docs-code">{`@navikt/ds-tokens/darkside-scss
@navikt/ds-tokens/darkside-less
@navikt/ds-tokens/darkside-js`}</code>
          </pre>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="large" as="h2" spacing>
            Changes
          </Heading>
          <BodyLong spacing>
            We have made a complete re-write of our <code>background</code>,{" "}
            <code>text</code>, <code>border-color</code> and{" "}
            <code>spacing</code> tokens.
          </BodyLong>

          <Heading size="medium" as="h3" spacing>
            Roles
          </Heading>
          <BodyLong spacing>
            We have updated each colors naming to better reflect their purpose.
          </BodyLong>

          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell scope="col">Old name</Table.HeaderCell>
                <Table.HeaderCell scope="col">New name (role)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.DataCell>Gray</Table.DataCell>
                <Table.DataCell>Neutral</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <Table.DataCell>Blue</Table.DataCell>
                <Table.DataCell>Accent</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <Table.DataCell>Green</Table.DataCell>
                <Table.DataCell>Success</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <Table.DataCell>Light blue</Table.DataCell>
                <Table.DataCell>Info</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <Table.DataCell>Orange</Table.DataCell>
                <Table.DataCell>Warning</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <Table.DataCell>Red</Table.DataCell>
                <Table.DataCell>Danger</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <Table.DataCell>Alt1</Table.DataCell>
                <Table.DataCell>Meta purple</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <Table.DataCell>Alt2</Table.DataCell>
                <Table.DataCell>Lime</Table.DataCell>
              </Table.Row>
              <Table.Row>
                <Table.DataCell>Alt3</Table.DataCell>
                <Table.DataCell>Brand blue</Table.DataCell>
              </Table.Row>
            </Table.Body>
          </Table>
          <br />
          <BodyLong spacing>
            We also have two new additions to our color-palette.{" "}
            <code>Brand magenta</code> and <code>Brand beige</code>
          </BodyLong>

          <Heading size="medium" as="h3" spacing>
            Semantic tokens
          </Heading>
          <BodyLong spacing>
            Each role has the same collection of tokens avaliable. This means
            you only need to learn the naming once.
            <pre className="docs-pre">
              <code className="docs-code">{`// Standalone
--ax-bg-default
--ax-bg-input
--ax-bg-overlay
--ax-bg-raised
--ax-bg-sunken
--ax-text-logo
--ax-border-focus

// Backgrounds for roles
--ax-bg-[role]-strong-pressed
--ax-bg-[role]-strong-hover
--ax-bg-[role]-strong
--ax-bg-[role]-moderate-pressedA
--ax-bg-[role]-moderate-pressed
--ax-bg-[role]-moderate-hoverA
--ax-bg-[role]-moderate-hover
--ax-bg-[role]-moderateA
--ax-bg-[role]-moderate
--ax-bg-[role]-soft-pressedA
--ax-bg-[role]-soft-pressed
--ax-bg-[role]-soft-hoverA
--ax-bg-[role]-soft-hover
--ax-bg-[role]-softA
--ax-bg-[role]-soft

// Text for roles
--ax-text-[role]
--ax-text-[role]-subtle
--ax-text-[role]-icon

// Border for roles
--ax-border-[role]
--ax-border-[role]-strong
--ax-border-[role]-subtle
--ax-border-[role]-subtleA
`}</code>
            </pre>
          </BodyLong>

          <Heading size="medium" as="h3" spacing>
            Spacing
          </Heading>
          <BodyLong spacing>
            In short, we now use the <code>space</code>-prefix for all our
            spacing tokens. We have also updated the naming to use px-naming,
            instead of a 1 to 4 scale. This allows for easier communication
            between design and development since all tooling (figma, devtools)
            uses px.
          </BodyLong>
          <BodyLong spacing>
            <pre className="docs-pre">
              <code className="docs-code">{`--a-spacing-32 ->: --ax-space-128
--a-spacing-24: --ax-space-96
--a-spacing-20: --ax-space-80
--a-spacing-18: --ax-space-72
--a-spacing-16: --ax-space-64
--a-spacing-14: --ax-space-56
--a-spacing-12: --ax-space-48
--a-spacing-11: --ax-space-44
--a-spacing-10: --ax-space-40
--a-spacing-9: --ax-space-36
--a-spacing-8: --ax-space-32
--a-spacing-7: --ax-space-28
--a-spacing-6: --ax-space-24
--a-spacing-5: --ax-space-20
--a-spacing-4: --ax-space-16
--a-spacing-3: --ax-space-12
--a-spacing-2: --ax-space-8
--a-spacing-1-alt: --ax-space-6
--a-spacing-1: --ax-space-4
--a-spacing-05: --ax-space-2
--a-spacing-0: --ax-space-0`}</code>
            </pre>
          </BodyLong>
        </Page.Block>
      </Page>
    </Box.New>
  );
};

export const TailwindPackage = () => {
  return (
    <Box.New paddingBlock="space-48" asChild className="darkside-docs">
      <Page>
        <Page.Block width="md" gutters>
          <BodyShort as="time">{`Last update: ${LAST_UPDATED}`}</BodyShort>

          <Heading size="xlarge" as="h1" spacing>
            @navikt/ds-tailwind
          </Heading>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="large" as="h2" spacing>
            Setup
          </Heading>
          <pre className="docs-pre">
            <code className="docs-code">
              {`@import "@navikt/ds-tailwind/darkside";`}
            </code>
          </pre>
          <BodyLong spacing>
            For tailwind to work with our tokens and theming, you will have to
            import our design-tokens in your project. This can be done by either
            importing <code>@navikt/ds-tokens/darkside-css</code> directly or by
            importing the CSS <code>@navikt/ds-css/darkside</code>.
          </BodyLong>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="large" as="h2" spacing>
            Changes
          </Heading>
          <BodyLong spacing>
            As this package is based on our tokens, all changes to tokens will
            affect this package. We dont have any tooling ready for this yet, so
            migration will have to be manual for now.
          </BodyLong>

          <Heading size="medium" as="h3" spacing>
            Tailwind 3
          </Heading>
          <BodyLong spacing>
            Since we now use CSS-varaibles for the config, you will not be able
            to add opacity on the fly.{" "}
            <code>{`className="bg-surface-subtle/90"`}</code>
            {". "} This is a limitation of TailwindCSS v3. If using TailwindCSS
            v4 they have updated the implementation to now work with
            CSS-variables.
          </BodyLong>
        </Page.Block>
      </Page>
    </Box.New>
  );
};

export const ReactPackage = () => {
  return (
    <Box.New paddingBlock="space-48" asChild className="darkside-docs">
      <Page>
        <Page.Block width="md" gutters>
          <BodyShort as="time">{`Last update: ${LAST_UPDATED}`}</BodyShort>

          <Heading size="xlarge" as="h1" spacing>
            @navikt/ds-react
          </Heading>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="large" as="h2" spacing>
            Setup
          </Heading>
          <pre className="docs-pre">
            <code className="docs-code">
              {`import { Theme } from '@navikt/ds-react';

// Light mode
<Theme theme="light">
  <App />
</Theme>

// Dark mode
<Theme theme="dark">
  <App />
</Theme>`}
            </code>
          </pre>
          <BodyLong spacing>
            Wrap your application in a <code>Theme</code>-component to use the
            new system. This component is required to use the new CSS and acts
            as a <code>Feature flag</code> internally. Using this component, you
            can also change between <code>theme=light</code> and{" "}
            <code>theme=dark</code> when implementing theme-switching interally
            in your application.
          </BodyLong>
          <Heading size="large" as="h2" spacing>
            Changes
          </Heading>
          <BodyLong spacing>
            While most of these changes might not affect your application, we
            list them here just in case.
          </BodyLong>
        </Page.Block>
        {/*  */}
        <Page.Block width="md" gutters>
          <Heading size="medium" as="h3" spacing>
            Accordion
          </Heading>
          <Heading size="small" as="h4" spacing>
            Properties
          </Heading>

          <BodyLong spacing>
            <code>variant</code> and <code>headingSize</code> are deprecated and
            no longer supported. <code>headingSize=small</code> now defaults to{" "}
            <code>xsmall</code> Heading and <code>headingSize=medium</code>{" "}
            defaults <code>small</code> Heading.
          </BodyLong>
          <Heading size="small" as="h4" spacing>
            Other changes
          </Heading>

          <BodyLong spacing>
            <code>Accordion.Content</code> now has an extra nested{" "}
            <code>div</code>, potentially breaking custom css overrides.
          </BodyLong>
        </Page.Block>
        {/*  */}
        <Page.Block width="md" gutters>
          <Heading size="medium" as="h3" spacing>
            Datepicker
          </Heading>

          <BodyLong spacing>
            Weeknumber-button uses our own button-component, and no longer a
            custom button.
          </BodyLong>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="medium" as="h3" spacing>
            GuidePanel
          </Heading>

          <BodyLong spacing>
            Component got a complete overhaul. Custom overrides might break.
          </BodyLong>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="medium" as="h3" spacing>
            Popover, HelpText, Tooltip
          </Heading>
          <Heading size="small" as="h4" spacing>
            Properties
          </Heading>

          <BodyLong spacing>
            <code>arrow</code> is removed. All our floating dialog-elents now
            come without arrow. If you have a custom <code>offset</code>, you
            might have to update it.
          </BodyLong>
        </Page.Block>

        <Page.Block width="md" gutters>
          <Heading size="medium" as="h3" spacing>
            Pagination
          </Heading>

          <BodyLong spacing>
            Button now uses <code>tertiary-neutral</code> and not regular{" "}
            <code>tertiary</code> variant.
          </BodyLong>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="medium" as="h3" spacing>
            Primitives
          </Heading>

          <BodyLong spacing>
            Given that these are closely tied to our tokens, you will most
            likely have to update parts of them to test the new system
          </BodyLong>
          <BodyLong spacing>
            All primitives using our current <code>spacing</code>-tokens now has
            the new <code>space</code>-tokens. You can use the old tokens while
            testing, but the full release will remove them from the proplist
          </BodyLong>

          <pre className="docs-pre">
            <code className="docs-code">
              {`// Before
<HStack gap="4">

// After:
<HStack gap="space-16">`}
            </code>
          </pre>

          <Heading size="small" as="h4" spacing>
            Page
          </Heading>
          <BodyLong spacing>
            <code>background</code>-prop is deprecated and cannot be used with
            the new system. Defaults to <code>bg-default</code>-token.
          </BodyLong>
          <Heading size="small" as="h4" spacing>
            Box
          </Heading>
          <BodyLong spacing>
            Since <code>{`<Box />`}</code> is directly tied to our tokens, we
            now offer <code>{`<Box.New />`}</code> as an altenative. This
            component is based on our new tokens and can use the backgrounds,
            borders, border-radius and shadows from the new system.{" "}
            <strong>
              All instances of <code>{`<Box />`}</code> will break when using
              the new system if the <code>background</code>, <code>shadow</code>{" "}
              or <code>borderColor</code> properties are used.
            </strong>
          </BodyLong>
        </Page.Block>
      </Page>
    </Box.New>
  );
};

export const CSSPackage = () => {
  return (
    <Box.New paddingBlock="space-48" asChild className="darkside-docs">
      <Page>
        <Page.Block width="md" gutters>
          <BodyShort as="time">{`Last update: ${LAST_UPDATED}`}</BodyShort>

          <Heading size="xlarge" as="h1" spacing>
            @navikt/ds-css
          </Heading>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="large" as="h2" spacing>
            Setup
          </Heading>
          <pre className="docs-pre">
            <code className="docs-code">
              {`@import "@navikt/ds-css/darkside";`}
            </code>
          </pre>
          <BodyLong spacing>
            As with the previous iteration of our CSS-package, it comes with the
            design-tokens built in. You will not need to explicitly import the
            tokens in your project.
          </BodyLong>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="large" as="h2" spacing>
            Changes
          </Heading>
          <BodyLong spacing>
            We have re-written most of our CSS to facilitate the
            theming-support. As a result, custom overrides based on overriding{" "}
            <code>.navds</code>-classNames might break and you will have to
            validate this yourself. As we strongly recommend avoiding custom
            overrides where possible, we would like to encourage opening an
            issue if you find that you have to override our CSS to achieve
            something! Its these cases we want to know about so that we can fix
            them for everyone.
          </BodyLong>

          <Heading size="medium" as="h3" spacing>
            CSS layers
          </Heading>
          <BodyLong spacing>
            The CSS-package now comes out of the box with CSS-layers. This means
            its css-specificity is set to 0. This might affect your current
            custom overrides, and you might have to make some changes.
          </BodyLong>
        </Page.Block>
      </Page>
    </Box.New>
  );
};

export const Changelog = () => {
  return (
    <Box.New paddingBlock="space-48" asChild className="darkside-docs">
      <Page>
        <Page.Block width="md" gutters>
          <BodyShort as="time">{`Last update: ${LAST_UPDATED}`}</BodyShort>

          <Heading size="xlarge" as="h1" spacing>
            Changelog
          </Heading>
        </Page.Block>
        <Page.Block width="md" gutters>
          <Heading size="large" as="h2" spacing>
            Nothing to report
          </Heading>
        </Page.Block>
      </Page>
    </Box.New>
  );
};
