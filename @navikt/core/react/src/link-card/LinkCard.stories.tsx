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
            isInset
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
        <LinkCard>
          <LinkCardHeading as="h3">
            <LinkCardAnchor href="#">
              Heading with a somewhat long text
            </LinkCardAnchor>
          </LinkCardHeading>
          <LinkCardTag variant="alt1">Beta</LinkCardTag>
        </LinkCard>
        <LinkCard>
          <LinkCardHeading as="h3">
            <LinkCardAnchor href="#">
              Heading with a somewhat long text
            </LinkCardAnchor>
          </LinkCardHeading>
          <LinkCardTag variant="alt1">Beta</LinkCardTag>
          <LinkCardTag variant="alt3">Stabil</LinkCardTag>
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
        <LinkCard ctaText="PENGESTØTTE">
          <LinkCardIcon placement="left" hasBackground={false}>
            <DemoPictogram />
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
        <LinkCard ctaText="PENGESTØTTE" isFullWidth>
          <LinkCardIcon placement="left" hasBackground={false}>
            <DemoPictogram />
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

function DemoPictogram() {
  return (
    <>
      <style>
        {`
      .Illustration_image {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 4rem;
          min-height: 4rem;
          width: 3.75rem;
          height: 3.75rem;
          flex-shrink: 0;
      }

      .IllustrationStatic_icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .IllustrationStatic_icon > *{
        width: 100%;
        height: 100%;
        }
      `}
      </style>
      <span className="Illustration_image" aria-hidden="true">
        <span className="IllustrationStatic_icon" id=":r1h:">
          <svg
            role="img"
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="48" cy="48" r="28" fill="#CCF1D6"></circle>
          </svg>
        </span>
        <span className="IllustrationStatic_icon" id=":r1i:">
          <svg
            role="img"
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M59 48L42.7895 65L37 59.1379L47.4211 48L37 36.8621L42.7895 31L59 48Z"
              stroke="#262626"
              strokeWidth="3"
            ></path>
          </svg>
        </span>
      </span>
    </>
  );
}
