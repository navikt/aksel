import { PlusCircleFillIcon } from "@navikt/aksel-icons";
import React from "react";
import {
  BodyLong,
  Alert as DsAlert,
  ConfirmationPanel as DsConfirmationPanel,
  Link,
} from "..";
export default {
  title: "ds-react/Link",
  component: Link,
};

export const Default = {
  render: ({ icon, inline, spacing }) => {
    const LinkD = () => (
      <Link href="#" inline={inline} spacing={spacing}>
        {icon && <PlusCircleFillIcon />}Ex aliqua incididunt
        {icon && <PlusCircleFillIcon />}
      </Link>
    );

    if (inline) {
      return (
        <BodyLong style={{ width: "800px", border: "1px solid black" }}>
          Incididunt laborum nisi nisi Lorem
          <LinkD />
          in. Laborum aute fugiat officia adipisicing non veniam dolor nulla non
          ex consectetur fugiat eiusmod aute. Culpa sit aute est duis minim in
          in voluptate velit fugiat. Laboris est id deserunt ut ea Lorem eu.
          Esse elit laboris aute commodo sint laborum fugiat aliqua.
        </BodyLong>
      );
    }
    return <LinkD />;
  },

  args: {
    icon: false,
    inline: false,
    spacing: false,
  },
};

export const Inline = {
  render: ({ icon, viewSpacing = false }) => {
    const LinkD = ({
      children = "Ex aliqua incididunt",
      inline = false,
      spacing = false,
    }) => (
      <Link href="#" inline={inline} spacing={spacing}>
        {icon && <PlusCircleFillIcon />}
        {children}
        {icon && <PlusCircleFillIcon />}
      </Link>
    );

    return (
      <div
        className="colgap"
        style={{ width: "800px", border: "1px solid black" }}
      >
        <style>
          {viewSpacing &&
            `
            .navds-link--spacing::before { background-color: red;}
            .navds-link--spacing::after { background-color: green;}
            `}
          {`.storybook-custom-spacing { white-space: pre;}`}
        </style>
        <BodyLong>
          <LinkD />
          Eiusmod aute.
          <LinkD />
          Culpa sit aute est duis minim in in voluptate velit
          <LinkD inline>
            https://blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah.com
          </LinkD>
          Incididunt laborum nisi nisi Lorem officia adipisicing non veniam
          <LinkD inline>
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah
          </LinkD>
          dolor eu. Esse elit laboris aute commodo sint laborum fugiat aliqua.
          <LinkD inline>Link</LinkD>
        </BodyLong>
        <BodyLong>
          <LinkD inline spacing>
            Link
          </LinkD>
          Eiusmod aute.
          <LinkD inline spacing>
            Link
          </LinkD>
          Culpa sit aute est duis minim in in voluptate velit
          <LinkD inline spacing>
            https://blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah.com
          </LinkD>
          Incididunt laborum nisi nisi Lorem officia adipisicing non veniam
          <LinkD inline spacing>
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah
          </LinkD>
          dolor eu. Esse elit laboris aute commodo sint laborum fugiat aliqua.
          <LinkD inline spacing>
            Link
          </LinkD>
        </BodyLong>
        <BodyLong className="storybook-custom-spacing">
          Custom{"   "}
          <LinkD inline>link</LinkD>
          {"     "}spacing.
        </BodyLong>
      </div>
    );
  },
  argTypes: {
    viewSpacing: {
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    viewSpacing: false,
    icon: false,
  },
};

const DemoLink = () => (
  <Link href="#">
    <PlusCircleFillIcon aria-hidden /> Ex aliqua incididunt{" "}
    <PlusCircleFillIcon aria-hidden />
  </Link>
);

export const Icon = () => <DemoLink />;

export const Alert = () => {
  return (
    <div className="colgap">
      <DsAlert variant="info">
        <DemoLink />
      </DsAlert>
      <DsAlert variant="success">
        <DemoLink />
      </DsAlert>
      <DsAlert variant="warning">
        <DemoLink />
      </DsAlert>
      <DsAlert variant="error">
        <DemoLink />
      </DsAlert>
    </div>
  );
};

export const ConfirmationPanel = () => {
  return (
    <div className="colgap">
      <DsConfirmationPanel label="demo">
        <DemoLink />
      </DsConfirmationPanel>
      <DsConfirmationPanel checked label="demo">
        <DemoLink />
      </DsConfirmationPanel>
      <DsConfirmationPanel error="demo" label="demo">
        <DemoLink />
      </DsConfirmationPanel>
    </div>
  );
};
