import { Meta } from "@storybook/react-vite";
import React from "react";
import { PencilIcon, PlusCircleFillIcon } from "@navikt/aksel-icons";
import { Alert } from "../../alert";
import { ConfirmationPanel } from "../../form/confirmation-panel";
import { Box } from "../../layout/box";
import { VStack } from "../../layout/stack";
import { BodyLong } from "../../typography";
import Link from "../Link";

const meta: Meta<typeof Link> = {
  title: "ds-react/Link",
  component: Link,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

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
      {iconLeft && <PencilIcon />}
      {children}
      {iconRight && <PencilIcon />}
    </Link>{" "}
  </>
);

export const Default = {
  render: ({ icon, inline, underline }) => {
    const LinkD = () => (
      <Link href="#" underline={underline} inlineText={inline}>
        {icon && <PlusCircleFillIcon />}Ex aliqua incididunt
        {icon && <PlusCircleFillIcon />}
      </Link>
    );

    if (inline) {
      return (
        <Box
          borderWidth="1"
          borderRadius="large"
          padding="4"
          style={{ maxWidth: "800px" }}
        >
          <BodyLong>
            Incididunt laborum nisi nisi Lorem <LinkD /> in. Laborum aute fugiat
            officia adipisicing non veniam dolor nulla non ex consectetur fugiat
            eiusmod aute. Culpa sit aute est duis minim in in voluptate velit
            fugiat. Laboris est id deserunt ut ea Lorem eu. Esse elit laboris
            aute commodo sint laborum fugiat aliqua.
          </BodyLong>
        </Box>
      );
    }
    return <LinkD />;
  },

  args: {
    icon: false,
    inline: false,
    underline: true,
  },
};

export const InlineInsideBodyLong = {
  render: ({ iconLeft, iconRight }) => {
    return (
      <Box
        borderWidth="1"
        borderRadius="large"
        padding="4"
        style={{ width: "800px" }}
      >
        <style>{`.storybook-custom-spacing { white-space: pre;}`}</style>
        <BodyLong spacing>
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
      </Box>
    );
  },
  args: {
    iconLeft: false,
    iconRight: false,
  },
};

export const Varianter = {
  render: ({ iconLeft, iconRight }) => {
    return (
      <VStack gap="3">
        {["action", "neutral", "subtle"].map((variant) => (
          <div key={variant}>
            <LinkWrapper
              iconLeft={iconLeft}
              iconRight={iconRight}
              variant={variant}
            />
          </div>
        ))}
      </VStack>
    );
  },
  args: {
    iconLeft: false,
    iconRight: false,
  },
};

const LinkWithIcon = () => (
  <Link href="#">
    <PlusCircleFillIcon aria-hidden />
    Ex aliqua incididunt
    <PlusCircleFillIcon aria-hidden />
  </Link>
);

export const Icon = () => <LinkWithIcon />;

const Variants = () => (
  <VStack gap="3">
    {["action", "neutral", "subtle"].map((variant) => (
      <div key={variant}>
        <LinkWrapper variant={variant} />
      </div>
    ))}
  </VStack>
);

export const ColorRole = () => (
  <VStack gap="3" data-color="brand-magenta">
    <Link href="#">Ex aliqua incididunt</Link>
    {["action", "neutral", "subtle"].map((variant) => (
      <div key={variant}>
        <LinkWrapper variant={variant} underline />
      </div>
    ))}
  </VStack>
);

export const Chromatic = () => (
  <>
    <h2>Default</h2>
    <Link href="#">Ex aliqua incididunt</Link>

    <h2>With icon</h2>
    <LinkWithIcon />

    <h2>Variants (no underline)</h2>
    <Variants />

    <h2>Inline</h2>
    <BodyLong style={{ width: 500 }}>
      Culpa sit aute est duis minim in in voluptate{" "}
      <Link href="#" inlineText>
        dette er en veldig lang lenke som brekker over flere linjer
        <PlusCircleFillIcon aria-hidden />
      </Link>{" "}
      Culpa sit aute est duis minim in in voluptate velit Incididunt laborum
      nisi nisi{" "}
      <Link href="#" inlineText>
        dette er en veldig lang lenke som brekker over flere linjer
      </Link>{" "}
      Lorem officia adipisicing non veniam occaecat commodo id ad aliquip.
    </BodyLong>

    <h2>In Alert</h2>
    <div className="colgap">
      <Alert variant="info">
        <LinkWithIcon />
      </Alert>
      <Alert variant="success">
        <LinkWithIcon />
      </Alert>
      <Alert variant="warning">
        <LinkWithIcon />
      </Alert>
      <Alert variant="error">
        <LinkWithIcon />
      </Alert>
    </div>

    <h2>In ConfirmationPanel</h2>
    <div className="colgap">
      <ConfirmationPanel label="demo">
        <LinkWithIcon />
      </ConfirmationPanel>
      <ConfirmationPanel checked label="demo">
        <LinkWithIcon />
      </ConfirmationPanel>
      <ConfirmationPanel error="demo" label="demo">
        <LinkWithIcon />
      </ConfirmationPanel>
    </div>
    <h2>ColorRole</h2>
    <div>
      <ColorRole />
    </div>
  </>
);
Chromatic.parameters = { chromatic: { disable: false } };

/* See .storybook/main.ts comment for explanation */
/* export const ChromaticHover = () => (
  <>
    <h2>With icon</h2>
    <LinkWithIcon />

    <h2>Variants (no underline)</h2>
    <Variants />

    <h2>In Alert</h2>
    <div className="colgap">
      <Alert variant="info">
        <LinkWithIcon />
      </Alert>
    </div>

    <h2>In ConfirmationPanel</h2>
    <div className="colgap">
      <ConfirmationPanel checked label="demo">
        <LinkWithIcon />
      </ConfirmationPanel>
    </div>
  </>
);
ChromaticHover.parameters = {
  chromatic: { disable: false },
  pseudo: { hover: true },
}; */

/* See .storybook/main.ts comment for explanation */
/* export const ChromaticFocusVisible = () => (
  <>
    <h2>With icon</h2>
    <LinkWithIcon />

    <h2>Variants (no underline)</h2>
    <Variants />

    <h2>In Alert</h2>
    <div className="colgap">
      <Alert variant="info">
        <LinkWithIcon />
      </Alert>
    </div>

    <h2>In ConfirmationPanel</h2>
    <div className="colgap">
      <ConfirmationPanel checked label="demo">
        <LinkWithIcon />
      </ConfirmationPanel>
    </div>
  </>
);
ChromaticFocusVisible.parameters = {
  chromatic: { disable: false },
  pseudo: { focusVisible: true },
}; */

/* See .storybook/main.ts comment for explanation */
/* export const ChromaticActive = () => (
  <>
    <h2>With icon</h2>
    <LinkWithIcon />

    <h2>Variants (no underline)</h2>
    <Variants />

    <h2>In Alert</h2>
    <div className="colgap">
      <Alert variant="info">
        <LinkWithIcon />
      </Alert>
    </div>

    <h2>In ConfirmationPanel</h2>
    <div className="colgap">
      <ConfirmationPanel checked label="demo">
        <LinkWithIcon />
      </ConfirmationPanel>
    </div>
  </>
);
ChromaticActive.parameters = {
  chromatic: { disable: false },
  pseudo: { active: true },
}; */
