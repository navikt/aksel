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
  render: ({ icon, inline }) => {
    const LinkD = () => (
      <>
        {" "}
        <Link href="#" inline={inline}>
          {icon && <PlusCircleFillIcon />}Ex aliqua incididunt
          {icon && <PlusCircleFillIcon />}
        </Link>{" "}
      </>
    );

    if (inline) {
      return (
        <div
          className="colgap"
          style={{ width: "800px", border: "1px solid black" }}
        >
          <BodyLong>
            Incididunt laborum nisi nisi Lorem
            <LinkD />
            in. Laborum aute fugiat officia adipisicing non veniam dolor nulla
            non ex consectetur fugiat eiusmod aute. Culpa sit aute est duis
            minim in in voluptate velit fugiat. Laboris est id deserunt ut ea
            Lorem eu. Esse elit laboris aute commodo sint laborum fugiat aliqua.
          </BodyLong>
        </div>
      );
    }
    return <LinkD />;
  },

  args: {
    icon: false,
    inline: false,
  },
};

export const Inline = {
  render: ({ icon }) => {
    const LinkInline = ({
      children = "Ex aliqua incididunt",
      "break-all": breakAll = false,
    }) => (
      <>
        {" "}
        <Link href="#" inline break-all={breakAll}>
          {icon && (
            <>
              <PlusCircleFillIcon />{" "}
            </>
          )}
          {children}
          {icon && (
            <>
              {" "}
              <PlusCircleFillIcon />
            </>
          )}
        </Link>{" "}
      </>
    );

    return (
      <div
        className="colgap"
        style={{ width: "800px", border: "1px solid black" }}
      >
        <style>{`.storybook-custom-spacing { white-space: pre;}`}</style>
        <BodyLong>
          <LinkInline />
          Eiusmod aute.
          <LinkInline />
          Culpa sit aute est duis minim in in voluptate velit
          <LinkInline break-all>
            https://blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah.com
          </LinkInline>
          Incididunt laborum nisi nisi Lorem officia adipisicing non veniam
          <LinkInline>
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah
          </LinkInline>
          dolor eu. Esse elit laboris aute commodo sint laborum fugiat aliqua.
          <LinkInline>Link</LinkInline>
        </BodyLong>
        <BodyLong className="storybook-custom-spacing">
          Custom{"   "}
          <LinkInline>link</LinkInline>
          {"     "}spacing.
        </BodyLong>
      </div>
    );
  },
  args: {
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
