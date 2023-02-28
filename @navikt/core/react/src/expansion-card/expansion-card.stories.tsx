import { Star } from "@navikt/ds-icons";
import React, { useState } from "react";
import { ExpansionCard } from ".";
import { BodyLong, BodyShort } from "../typography";
import { Link } from "../link";
import ExpansionCardContent from "./ExpansionCardContent";
import ExpansionCardHeader from "./ExpansionCardHeader";

export default {
  title: "ds-react/ExpansionCard",
  component: ExpansionCard,
  subcomponents: [ExpansionCardHeader, ExpansionCardContent],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "600px",
          minHeight: "100vh",
          padding: "10rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

const variants = ["neutral", "neutral-filled"] as const;

const Content = () => (
  <ExpansionCard.Content>
    <BodyLong spacing>
      På ditt faste arbeidssted vil du ha yrkesskadedekning også i hvilepauser,
      lunsjpauser, trimaktiviteter og lignende i arbeidstiden.
    </BodyLong>
    <BodyLong spacing>
      Som hovedregel er du som arbeidstaker ikke yrkesskadedekket på veien til
      og fra arbeid eller første og siste oppdragssted. Du er heller ikke
      yrkesskadedekket på fritiden eller under private gjøremål i arbeidstiden.
    </BodyLong>
    <BodyLong spacing>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga suscipit
      voluptatum expedita earum id, aperiam deleniti molestiae eveniet
      doloremque explicabo perspiciatis quasi repellendus! Est dolore a nemo
      aspernatur obcaecati dicta.
    </BodyLong>
    <BodyLong spacing>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga suscipit
      voluptatum expedita earum id, aperiam deleniti molestiae eveniet
      doloremque explicabo perspiciatis quasi repellendus! Est dolore a nemo
      aspernatur obcaecati dicta.
    </BodyLong>
    <BodyLong>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga suscipit
      voluptatum expedita earum id, aperiam deleniti molestiae eveniet
      doloremque explicabo perspiciatis quasi repellendus! Est dolore a nemo
      aspernatur obcaecati dicta.
    </BodyLong>
  </ExpansionCard.Content>
);

export const Default = {
  render: (props) => {
    return (
      <ExpansionCard open={props?.open || undefined} size={props.size}>
        <ExpansionCard.Header
          {...props}
          avatar={props?.avatar ? <Star aria-hidden /> : undefined}
        >
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    );
  },
  args: { avatar: false, open: false, size: "medium" },
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "select", options: ["medium", "small"] },
  },
};

export const Description = {
  render: () => (
    <>
      <ExpansionCard>
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard variant="alt3">
        <ExpansionCard.Header avatar={<Star aria-hidden />}>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    </>
  ),
};

export const Avatar = {
  render: () => (
    <>
      <ExpansionCard variant="alt3">
        <ExpansionCard.Header avatar={<Star aria-hidden />}>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard variant="alt3">
        <ExpansionCard.Header avatar={<Star aria-hidden />}>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard>
        <ExpansionCard.Header
          hideAvatarBg
          avatar={
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_227_1696)">
                <rect x="20" y="21" width="24" height="8" fill="#FFE6E6" />
                <rect x="20" y="34" width="24" height="8" fill="#FFE6E6" />
                <circle cx="32" cy="32" r="19" fill="#FFE6E6" />
                <path
                  d="M21.1264 4.89567L26.7734 10.5271M1.33325 29.9997H30.6666M23.5293 2.49932L9.41168 16.578L7.99992 23.6173L15.0587 22.2095L29.1764 8.13079C30.7358 6.57571 30.7358 4.05441 29.1764 2.49932C27.617 0.944236 25.0887 0.944236 23.5293 2.49932Z"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 39.333L56.6667 39.333"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 46.666L56.6667 46.666"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 54L56.6667 54"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6667 46.666L45.3334 46.666"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6667 46.666L45.3334 46.666"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6667 39.333L45.3334 39.333"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6667 39.333L45.3334 39.333"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6667 54L45.3334 54"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6667 54L45.3334 54"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="36.6667"
                  y="29.333"
                  width="26"
                  height="33.3333"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_227_1696">
                  <rect width="64" height="64" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
        >
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard variant="alt3-filled">
        <ExpansionCard.Header
          avatar={
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_227_1696)">
                <rect
                  x="20"
                  y="21"
                  width="24"
                  height="8"
                  fill="var(--a-deepblue-100)"
                />
                <rect
                  x="20"
                  y="34"
                  width="24"
                  height="8"
                  fill="var(--a-deepblue-100)"
                />
                <circle cx="32" cy="32" r="19" fill="var(--a-deepblue-100)" />
                <path
                  d="M21.1264 4.89567L26.7734 10.5271M1.33325 29.9997H30.6666M23.5293 2.49932L9.41168 16.578L7.99992 23.6173L15.0587 22.2095L29.1764 8.13079C30.7358 6.57571 30.7358 4.05441 29.1764 2.49932C27.617 0.944236 25.0887 0.944236 23.5293 2.49932Z"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 39.333L56.6667 39.333"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 46.666L56.6667 46.666"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 54L56.6667 54"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6667 46.666L45.3334 46.666"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6667 46.666L45.3334 46.666"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6667 39.333L45.3334 39.333"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6667 39.333L45.3334 39.333"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6667 54L45.3334 54"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6667 54L45.3334 54"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="36.6667"
                  y="29.333"
                  width="26"
                  height="33.3333"
                  stroke="#262626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_227_1696">
                  <rect width="64" height="64" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
        >
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    </>
  ),
};

export const Variants = {
  render: () => (
    <>
      {variants.map((x) => (
        <ExpansionCard variant={x}>
          <ExpansionCard.Header avatar={<Star aria-hidden />} key={x}>
            <ExpansionCard.Title>{x}</ExpansionCard.Title>
            <ExpansionCard.Description>
              For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
              til tid, sted og arbeidsoppgaver.
            </ExpansionCard.Description>
          </ExpansionCard.Header>
          <Content />
        </ExpansionCard>
      ))}
    </>
  ),
};

export const Sizes = {
  render: () => (
    <>
      <h2>Medium</h2>
      <ExpansionCard>
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard variant="alt3">
        <ExpansionCard.Header avatar={<Star aria-hidden />}>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard>
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard variant="alt3">
        <ExpansionCard.Header avatar={<Star aria-hidden />}>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <h2>Small</h2>
      <ExpansionCard size="small">
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard size="small" variant="alt3">
        <ExpansionCard.Header avatar={<Star aria-hidden />}>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard size="small">
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard size="small" variant="alt3">
        <ExpansionCard.Header avatar={<Star aria-hidden />}>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    </>
  ),
};

export const HeadingSizing = {
  render: () => (
    <>
      {(["large", "medium", "small"] as const).map((x) => (
        <ExpansionCard>
          <ExpansionCard.Header avatar={<Star aria-hidden />} key={x}>
            <ExpansionCard.Title size={x}>{x}</ExpansionCard.Title>
            <ExpansionCard.Description>
              For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
              til tid, sted og arbeidsoppgaver
            </ExpansionCard.Description>
          </ExpansionCard.Header>
          <Content />
        </ExpansionCard>
      ))}
    </>
  ),
};

export const ClickArea = {
  render: () => (
    <>
      <ExpansionCard variant="alt3" clickArea="full">
        <ExpansionCard.Header avatar={<Star aria-hidden />}>
          <ExpansionCard.Title>Full clickarea</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>

      <ExpansionCard variant="alt3" clickArea="button">
        <ExpansionCard.Header avatar={<Star aria-hidden />}>
          <ExpansionCard.Title>Only button</ExpansionCard.Title>
          <ExpansionCard.Description>
            <BodyShort spacing as="span">
              For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
              til tid.
            </BodyShort>{" "}
            <Link href="#">Lenke til forside</Link>
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    </>
  ),
};

export const DefaultOpen = {
  render: () => (
    <ExpansionCard defaultOpen variant="alt3">
      <ExpansionCard.Header avatar={<Star aria-hidden />}>
        <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        <ExpansionCard.Description>
          For at yrkesskadedekningen skal gjelde, er det som hovedregel krav til
          tid, sted og arbeidsoppgaver
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <Content />
    </ExpansionCard>
  ),
};

export const ControlledState = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <ExpansionCard open={open} onToggle={setOpen} variant="alt3">
        <ExpansionCard.Header
          avatar={
            <Star aria-hidden style={{ width: "5rem", height: "5rem" }} />
          }
        >
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    );
  },
};
