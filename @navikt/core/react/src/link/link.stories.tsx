import { PlusCircleFillIcon } from "@navikt/aksel-icons";
import React from "react";
import {
  BodyLong,
  Alert as DsAlert,
  ConfirmationPanel as DsConfirmationPanel,
  Link,
} from "..";
import { RandomIcon } from "../util/RandomIcon";

export default {
  title: "ds-react/Link",
  component: Link,
};

const LinkWrapper = ({
  children = "Ex aliqua incididunt",
  iconRight = false,
  iconLeft = false,
  variant = "action",
  underline = false,
  inlineText = true,
}) => (
  <>
    {" "}
    <Link
      href="#"
      underline={underline}
      variant={variant as "action" | "neutral" | "subtle"}
      inlineText={inlineText}
    >
      {iconLeft && (
        <>
          <RandomIcon />{" "}
        </>
      )}
      {children}
      {iconRight && (
        <>
          {" "}
          <RandomIcon />
        </>
      )}
    </Link>{" "}
  </>
);

export const Default = {
  render: ({ icon, inline }) => {
    const LinkD = () => (
      <>
        {" "}
        <Link href="#" underline={!inline} inlineText={inline}>
          {icon && <PlusCircleFillIcon />}Ex aliqua incididunt
          {icon && <PlusCircleFillIcon />}
        </Link>{" "}
      </>
    );

    if (inline) {
      return (
        <div
          className="colgap"
          style={{
            width: "800px",
            border: "1px solid black",
            borderRadius: "8px",
          }}
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

export const InlineInsideBodyLong = {
  render: ({ iconLeft, iconRight }) => {
    return (
      <div
        className="colgap"
        style={{
          width: "800px",
          border: "1px solid black",
          borderRadius: "8px",
        }}
      >
        <style>{`.storybook-custom-spacing { white-space: pre;}`}</style>
        <BodyLong>
          <LinkWrapper underline iconLeft={iconLeft} iconRight={iconRight} />
          Eiusmod aute.
          <LinkWrapper underline iconLeft={iconLeft} iconRight={iconRight} />
          Culpa sit aute est duis minim in in voluptate velit Incididunt laborum
          nisi nisi Lorem officia adipisicing non veniam
          <LinkWrapper underline iconLeft={iconLeft} iconRight={iconRight}>
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah
          </LinkWrapper>
          dolor eu. Esse elit laboris aute commodo sint laborum fugiat aliqua.
          <LinkWrapper underline iconLeft={iconLeft} iconRight={iconRight}>
            Link
          </LinkWrapper>
        </BodyLong>
        <BodyLong className="storybook-custom-spacing">
          Custom{"   "}
          <LinkWrapper underline iconLeft={iconLeft} iconRight={iconRight}>
            link
          </LinkWrapper>
          {"     "}spacing.
        </BodyLong>
      </div>
    );
  },
  args: {
    iconLeft: false,
    iconRight: false,
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

export const Variants = {
  render: ({ iconLeft, iconRight }) => {
    return (
      <div className="colgap">
        {["action", "neutral", "subtle"].map((variant) => (
          <>
            <div>
              <LinkWrapper
                iconLeft={iconLeft}
                iconRight={iconRight}
                variant={variant}
              />
            </div>
          </>
        ))}
      </div>
    );
  },
  args: {
    iconLeft: false,
    iconRight: false,
  },
};
