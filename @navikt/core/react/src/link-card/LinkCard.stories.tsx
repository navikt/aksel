import { StoryObj } from "@storybook/react";
import React from "react";
import { WalletIcon } from "@navikt/aksel-icons";
import { VStack } from "../layout/stack";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardHeading,
  LinkCardIcon,
  LinkCardImage,
  LinkCardTag,
} from "./LinkCard";

export default {
  title: "ds-react/LinkCard",
  component: LinkCard,
  parameters: {
    chromatic: { disable: true },
  },
};

type Story = StoryObj<typeof LinkCard>;

export const Default: Story = {
  render: () => {
    return (
      <VStack gap="8">
        <LinkCard ctaText="PENGESTØTTE">
          <LinkCardHeading as="h3">
            <LinkCardAnchor href="#">
              Heading with a somewhat long text
            </LinkCardAnchor>
          </LinkCardHeading>
          <LinkCardDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
            voluptatum voluptate velit commodi obcaecati.
          </LinkCardDescription>
        </LinkCard>
        <LinkCard ctaText="PENGESTØTTE">
          <LinkCardHeading as="h3">
            <LinkCardAnchor href="#">
              Heading with a somewhat long text
            </LinkCardAnchor>
          </LinkCardHeading>
          <LinkCardIcon data-color-role="meta-purple">
            <WalletIcon aria-hidden />
          </LinkCardIcon>
          <LinkCardTag variant="alt1">Beta</LinkCardTag>
          <LinkCardDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
            voluptatum voluptate velit commodi obcaecati.
          </LinkCardDescription>
        </LinkCard>
        <LinkCard ctaText="PENGESTØTTE">
          <LinkCardHeading as="h3">
            <LinkCardAnchor href="#">
              Heading with a somewhat long text
            </LinkCardAnchor>
          </LinkCardHeading>
          <LinkCardTag variant="alt1">Beta</LinkCardTag>
          <LinkCardDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
            voluptatum voluptate velit commodi obcaecati.
          </LinkCardDescription>
        </LinkCard>
        <LinkCard ctaText="PENGESTØTTE">
          <LinkCardHeading as="h3">
            <LinkCardAnchor href="#">
              Heading with a somewhat long text
            </LinkCardAnchor>
          </LinkCardHeading>
          <LinkCardImage
            alt="123"
            src="https://picsum.photos/800/600"
            aspectRatio="16:9"
          />
          <LinkCardDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
            voluptatum voluptate velit commodi obcaecati.
          </LinkCardDescription>
        </LinkCard>
        <LinkCard>
          <LinkCardHeading as="h3">
            <LinkCardAnchor href="#">
              Heading with a somewhat long text
            </LinkCardAnchor>
          </LinkCardHeading>
          <LinkCardTag variant="alt1">Beta</LinkCardTag>
          <LinkCardDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
            voluptatum voluptate velit commodi obcaecati.
          </LinkCardDescription>
        </LinkCard>
        <LinkCard ctaText="PENGESTØTTE">
          <LinkCardHeading as="h3">
            <LinkCardAnchor href="#">
              Heading with a somewhat long text
            </LinkCardAnchor>
          </LinkCardHeading>
        </LinkCard>
        <LinkCard ctaText="PENGESTØTTE">
          <LinkCardIcon data-color-role="meta-purple">
            <WalletIcon aria-hidden />
          </LinkCardIcon>
          <LinkCardHeading as="h3">
            <LinkCardAnchor href="#">
              Heading with a somewhat long text
            </LinkCardAnchor>
          </LinkCardHeading>
        </LinkCard>
        <LinkCard ctaText="PENGESTØTTE">
          <LinkCardIcon data-color-role="meta-purple" placement="left">
            <WalletIcon aria-hidden />
          </LinkCardIcon>
          <LinkCardHeading as="h3">
            <LinkCardAnchor href="#">
              Heading with a somewhat long text
            </LinkCardAnchor>
          </LinkCardHeading>
        </LinkCard>
        <LinkCard ctaText="PENGESTØTTE">
          <LinkCardIcon data-color-role="meta-purple" placement="left">
            <WalletIcon aria-hidden />
          </LinkCardIcon>
          <LinkCardHeading as="h3">
            <LinkCardAnchor href="#">
              Heading with a somewhat long text
            </LinkCardAnchor>
          </LinkCardHeading>
          <LinkCardDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
            voluptatum voluptate velit commodi obcaecati.
          </LinkCardDescription>
        </LinkCard>
      </VStack>
    );
  },
};
