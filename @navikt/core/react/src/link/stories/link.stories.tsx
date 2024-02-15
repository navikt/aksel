import React from "react";
import { PlusCircleFillIcon } from "@navikt/aksel-icons";
import { Alert } from "../../alert";
import { ConfirmationPanel } from "../../form";
import { BodyLong } from "../../typography";
import Link from "../Link";
import { RandomIcon } from "./RandomIcon";

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

export const InAlert = () => {
  return (
    <div className="colgap">
      <Alert variant="info">
        <DemoLink />
      </Alert>
      <Alert variant="success">
        <DemoLink />
      </Alert>
      <Alert variant="warning">
        <DemoLink />
      </Alert>
      <Alert variant="error">
        <DemoLink />
      </Alert>
    </div>
  );
};

export const InConfirmationPanel = () => {
  return (
    <div className="colgap">
      <ConfirmationPanel label="demo">
        <DemoLink />
      </ConfirmationPanel>
      <ConfirmationPanel checked label="demo">
        <DemoLink />
      </ConfirmationPanel>
      <ConfirmationPanel error="demo" label="demo">
        <DemoLink />
      </ConfirmationPanel>
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

export const InlineLink = {
  render: () => (
    <BodyLong>
      Officia incididunt Culpa sit aute est duis minim in in voluptate velit
      Incididunt laborum nisi nisi Lorem officia adipisicing non veniam{" "}
      <Link href="#" inlineText={true}>
        lenke til ny side
        <PlusCircleFillIcon aria-hidden />
      </Link>{" "}
      Culpa sit aute est duis minim in in voluptate velit Incididunt laborum
      nisi nisi Lorem officia adipisicing non veniam occaecat commodo id ad
      aliquip.
    </BodyLong>
  ),
};
