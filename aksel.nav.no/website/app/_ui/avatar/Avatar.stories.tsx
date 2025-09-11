import { type Meta, type StoryFn } from "@storybook/react";
import "@navikt/ds-css/darkside";
import {
  Accordion,
  BodyLong,
  BodyShort,
  HGrid,
  HStack,
  Heading,
  LinkCard,
  VStack,
} from "@navikt/ds-react";
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@navikt/ds-react/Accordion";
import {
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardTitle,
} from "@navikt/ds-react/LinkCard";
import { Avatar, AvatarStack } from "./Avatar";
import { HoverCard, HoverCardGroup } from "./HoverCard";

const meta = {
  title: "Website-modules/AvatarStack",
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <div style={{ display: "grid", placeContent: "center" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof AvatarStack>;

export default meta;

export const LoneAvatar: StoryFn = () => {
  return (
    <VStack gap="space-16">
      <Avatar type="Team" imageSrc="/avatars/aksel.svg" name="Team aksel" />
      <Avatar
        type="Miljø"
        showName
        imageSrc="/avatars/aksel.svg"
        name="Team aksel"
      />
    </VStack>
  );
};

export const LoneAvatarInteractive: StoryFn = () => {
  return (
    <VStack gap="space-16">
      <HoverCard
        popoverContent={
          <>
            <Heading level="2" size="xlarge">
              Team Aksel!!
            </Heading>
            <BodyLong>Dette teamet er et team!</BodyLong>
            <Accordion>
              <AccordionItem>
                <AccordionHeader>
                  Her kan man plassere hva som helst
                </AccordionHeader>
                <AccordionContent>Content 1</AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        }
      >
        <Avatar
          type="Team"
          imageSrc="/avatars/aksel.svg"
          name="Team aksel"
        ></Avatar>
      </HoverCard>
      <HoverCard
        popoverContent={
          <>
            <Heading level="2" size="xlarge">
              Team Aksel
            </Heading>
            <BodyLong>ReactNode content</BodyLong>
            <Accordion>
              <AccordionItem>
                <AccordionHeader>
                  Her kan man plassere hva som helst
                </AccordionHeader>
                <AccordionContent>Content 1</AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        }
      >
        <Avatar
          type="Team"
          showName
          imageSrc="/avatars/aksel.svg"
          name="Team aksel"
        ></Avatar>
      </HoverCard>
      <HoverCardGroup>
        <BodyShort>inside a HoverCardGroup</BodyShort>
        <HStack gap="space-16">
          <HoverCard
            popoverContent={
              <>
                <Heading level="2" size="xlarge">
                  Team Aksel
                </Heading>
                <BodyLong>ReactNode content</BodyLong>
                <Accordion>
                  <AccordionItem>
                    <AccordionHeader>
                      Her kan man plassere hva som helst
                    </AccordionHeader>
                    <AccordionContent>Content 1</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            }
          >
            <Avatar
              type="Team"
              showName
              imageSrc="/avatars/aksel.svg"
              name="Team aksel"
            ></Avatar>
          </HoverCard>
          <HoverCard
            popoverContent={
              <>
                <Heading level="2" size="xlarge">
                  Team Aksel
                </Heading>
                <BodyLong>ReactNode content</BodyLong>
                <Accordion>
                  <AccordionItem>
                    <AccordionHeader>
                      Her kan man plassere hva som helst
                    </AccordionHeader>
                    <AccordionContent>Content 1</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            }
          >
            <Avatar
              type="Team"
              showName
              imageSrc="/avatars/aksel.svg"
              name="Team aksel"
            ></Avatar>
          </HoverCard>
        </HStack>
      </HoverCardGroup>
    </VStack>
  );
};

export const StackInteractive: StoryFn = () => {
  return (
    <HoverCard
      popoverContent={
        <>
          <Heading level="2" size="xlarge">
            Team Aksel
          </Heading>
          <BodyLong>ReactNode content</BodyLong>
          <Accordion>
            <AccordionItem>
              <AccordionHeader>
                Her kan man plassere hva som helst
              </AccordionHeader>
              <AccordionContent>Content 1</AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      }
    >
      <AvatarStack>
        <Avatar type="Team" imageSrc="/avatars/aksel.svg" name="Team aksel" />
        <Avatar type="Team" imageSrc="/avatars/001.svg" name="Team Nav.no" />
        <Avatar type="Team" imageSrc="/avatars/002.svg" name="Team Nais" />
      </AvatarStack>
    </HoverCard>
  );
};

export const SingleStack: StoryFn = () => {
  return (
    <div>
      <AvatarStack>
        <Avatar type="Team" imageSrc="/avatars/aksel.svg" name="Team aksel" />
      </AvatarStack>
    </div>
  );
};

export const MultipleStack: StoryFn = () => {
  return (
    <VStack gap="space-8">
      <AvatarStack>
        <Avatar type="Team" imageSrc="/avatars/aksel.svg" name="Team aksel" />
        <Avatar type="Team" imageSrc="/avatars/001.svg" name="Team Nav.no" />
        <Avatar type="Team" imageSrc="/avatars/002.svg" name="Team Nais" />
      </AvatarStack>
      <AvatarStack>
        <Avatar type="Team" imageSrc="/avatars/aksel.svg" name="Team aksel" />
        {[...Array(20)].map((counter) => (
          <Avatar
            type="Team"
            key={counter}
            name={`Team ${counter}`}
            imageSrc="/avatars/003.svg"
          />
        ))}
      </AvatarStack>
      <AvatarStack showNames>
        <Avatar type="Team" imageSrc="/avatars/aksel.svg" name="Team aksel" />
        <Avatar type="Team" imageSrc="/avatars/001.svg" name="Team Nav.no" />
        <Avatar type="Team" imageSrc="/avatars/002.svg" name="Team Nais" />
      </AvatarStack>
      <AvatarStack showNames>
        <Avatar type="Team" imageSrc="/avatars/aksel.svg" name="Team aksel" />
        {[...Array(20)].map((counter) => (
          <Avatar
            type="Team"
            key={counter}
            name={`Team ${counter}`}
            imageSrc="/avatars/003.svg"
          />
        ))}
      </AvatarStack>
    </VStack>
  );
};

export const MissingImage: StoryFn = () => {
  return (
    <AvatarStack>
      <Avatar type="Team" imageSrc="/avatars/aksel.svg" name="Team aksel" />
      <Avatar type="Team" imageSrc="/avatars/missing.svg" name="Team Nav.no" />
      <Avatar type="Team" imageSrc="/avatars/002.svg" name="Team Nais" />
    </AvatarStack>
  );
};

export const NoData: StoryFn = () => {
  return <AvatarStack />;
};

export const InsideCard: StoryFn = () => {
  return (
    <HGrid gap="space-16" columns={2} maxWidth="800px">
      <LinkCard>
        <LinkCardTitle as="h2">
          <LinkCardAnchor href="#">Aksel med oppgradert design</LinkCardAnchor>
        </LinkCardTitle>
        <LinkCardDescription>
          Snart kommer en ny versjon av Aksel med flere stiloppgraderinger for
          våre komponenter. Da får vi blant annet darkmode-støtte, forbedret
          fargepalett, færre skygger og litt rundere hjørner.
        </LinkCardDescription>
        <LinkCardFooter>
          <AvatarStack showNames>
            <Avatar
              type="Team"
              imageSrc="/avatars/aksel.svg"
              name="Team aksel"
            />
          </AvatarStack>
        </LinkCardFooter>
      </LinkCard>
      <LinkCard arrow={false}>
        <LinkCardTitle as="h2">
          <LinkCardAnchor href="#">
            Hvordan produktstrategien samler teamet vårt
          </LinkCardAnchor>
        </LinkCardTitle>
        <LinkCardDescription>
          Produkstrategi er noe litt ullent. I denne artikkelen skriver vi litt
          om hvordan Team Datajegerne jobber med dette og viser hvordan
          strategien vår ser ut.
        </LinkCardDescription>
        <LinkCardFooter>
          <AvatarStack showNames>
            <Avatar
              type="Team"
              imageSrc="/avatars/aksel.svg"
              name="Team aksel"
            />
            <Avatar
              type="Team"
              imageSrc="/avatars/001.svg"
              name="Team Nav.no"
            />
            <Avatar type="Team" imageSrc="/avatars/002.svg" name="Team Nais" />
          </AvatarStack>
        </LinkCardFooter>
      </LinkCard>
      <LinkCard>
        <LinkCardTitle as="h2">
          <LinkCardAnchor href="#">This is a LinkCard</LinkCardAnchor>
        </LinkCardTitle>
        <LinkCardDescription>description</LinkCardDescription>
        <LinkCardFooter>
          <AvatarStack showNames>
            <Avatar
              type="Team"
              imageSrc="/avatars/aksel.svg"
              name="Team aksel"
            />
            <Avatar
              type="Team"
              imageSrc="/avatars/001.svg"
              name="Team Nav.no"
            />
            <Avatar type="Team" imageSrc="/avatars/002.svg" name="Team Nais" />
          </AvatarStack>
        </LinkCardFooter>
      </LinkCard>
    </HGrid>
  );
};
