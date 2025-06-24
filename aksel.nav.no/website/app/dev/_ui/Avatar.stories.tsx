import { type Meta, type StoryFn } from "@storybook/react";
import "@navikt/ds-css/darkside";
import { VStack } from "@navikt/ds-react";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardTitle,
} from "../(god-praksis)/_ui/link-card/LinkCard";
import { AvatarStack } from "./Avatar";

const dummyAvatar1 = {
  name: "Team Aksel",
  description: `En aksel er en maskindel, for det meste en stang, som roterer om sin egen akse og derved overfører kraft til andre maskindeler. 
Akselens rotasjon skapes typisk av en motor eller tilføres fra et tannhjul eller en remskive. Et tannhjul eller en remskive er normalt også den enheten som viderefører energien fra akselen.
`,
  imageSrc: "/avatars/aksel.svg",
};

const dummyAvatar2 = {
  name: "Team Nav.no",
  description: `Nav er den sentrale delen av et hjul. Ytterst ligger kransen, og eikene eller skiven forbinder nav og krans.`,
  imageSrc: "/avatars/001.svg",
};

const dummyAvatar3 = {
  name: "Nais",
  description: `Ordet "nais" er en direkte låneord fra engelsk "nice" og brukes i et uformelt språkbruk om noe som er "fint", "gøy", "greit" eller "behagelig". Det brukes ofte i muntlig og uformell skriftlig kommunikasjon.`,
  imageSrc: "/avatars/002.svg",
};

const dummyAvatarBroken = {
  name: "Team Ødelagt",
  description: `Dette teamet mangler et bilde for avataren sin.`,
  imageSrc: "/avatars/missing.svg",
};

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

export const Single: StoryFn = () => {
  return <AvatarStack avatars={[dummyAvatar1]} />;
};

export const Multiple: StoryFn = () => {
  return (
    <VStack gap="space-8">
      <AvatarStack avatars={[dummyAvatar1, dummyAvatar2, dummyAvatar3]} />
      <AvatarStack avatars={[...Array(20).fill(dummyAvatar2), dummyAvatar3]} />
    </VStack>
  );
};

export const WithBrokenLink: StoryFn = () => {
  return (
    <AvatarStack avatars={[dummyAvatar1, dummyAvatarBroken, dummyAvatar2]} />
  );
};

export const InsideCard: StoryFn = () => {
  return (
    <LinkCard autoLayout={false}>
      <LinkCardTitle as="h2">
        <LinkCardAnchor href="#">This is a LinkCard</LinkCardAnchor>
      </LinkCardTitle>
      <LinkCardDescription>description</LinkCardDescription>
      <LinkCardFooter>
        <AvatarStack avatars={[dummyAvatar1, dummyAvatar2, dummyAvatar3]} />
      </LinkCardFooter>
    </LinkCard>
  );
};

export const Interactive: StoryFn = () => {
  return <AvatarStack interactive avatars={[dummyAvatar1]} />;
};
