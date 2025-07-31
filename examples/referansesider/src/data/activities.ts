import { TagProps } from "@navikt/ds-react";

export interface BaseActivity {
  actionText?: string;
  category: string;
  title: string;
  date?: { start: string; end?: string };
  description: string;
  hasChange?: boolean;
  id: string;
  location: string;
  tag?: { variant: TagProps["variant"]; text: string };
}

export interface JobPosition extends BaseActivity {
  category: "Stilling fra Nav";
  employer: string;
}

export interface Treatment extends BaseActivity {
  category: "Behandling";
  goal: string;
  treatmentType: string;
}

export interface Meeting extends BaseActivity {
  category: "Møte med Nav";
  time: string;
  length: string;
  meetingForm: string;
  meetingPurpose: string;
}

export interface JobOrientedActivity extends BaseActivity {
  goal: string;
  notesToSelf: string;
  link: string;
}

export type Activity = JobPosition | Meeting | Treatment;

const activities: Activity[] = [
  {
    category: "Stilling fra Nav",
    description:
      "Nav hjelper en arbeidsgiver med å finne kandidater til en stilling, og tror den kan passe for deg.",
    employer: "Havsalt AS",
    title: "Servitør",
    hasChange: true,
    id: "1",
    location: "Kristiansand",
    actionText: "Les mer om stillingen",
    tag: {
      variant: "success",
      text: "Venter på Nav",
    },
  },
  {
    category: "Behandling",
    goal: "Bli kvitt hodepine",
    location: "Oslo",
    title: "Medisinsk behandling",
    treatmentType: "Fysioterapi",
    date: {
      start: "13.09.2022",
      end: "14.09.2022",
    },
    description: `CaCO3 løses i vann ved oppkok og avkjøles til 25˚C. Løsningen appliseres til tøystykker og legges rundt bruddstedet. Beinet holdes i ro til gipsen har stivnet. Dette burde ta en dag, men det er lurt å ta forbehold om at det kan gå flere dager. CaCO3 løses i vann ved oppkok og avkjøles til 25˚C.`,
    id: "2",
    actionText: "Endre på aktiviteten",
    tag: { variant: "info-filled", text: "Avtalt med Nav" },
  },
  {
    category: "Møte med Nav",
    description:
      "Nav ønsker et møte med deg. Du må gi beskjed så raskt som mulig hvis tidspunktet ikke passer.",
    location: "Oslo",
    title: "Beste møtet ever",
    time: "13:00",
    length: "30 min",
    meetingForm: "Fysisk møte",
    meetingPurpose:
      "Vi ønsker å snakke med deg om aktiviteter du har gjennomført og videre oppfølging.",
    date: {
      start: "21.08.2030",
    },
    id: "3",
  },
  {
    category: "Stilling fra Nav",
    description:
      "Nav hjelper en arbeidsgiver med å finne kandidater til en stilling, og tror den kan passe for deg.",
    employer: "Har Svart Innen Fristen AS",
    location: "Kristiansand",
    hasChange: true,
    id: "4",
    title: "Servitør",
    tag: {
      variant: "success",
      text: "Venter på Nav",
    },
    actionText: "Les mer om stillingen",
  },
  {
    category: "Stilling fra Nav",
    description:
      "Nav hjelper en arbeidsgiver med å finne kandidater til en stilling, og tror den kan passe for deg.",
    employer: "Havsalt AS",
    location: "Kristiansand",
    hasChange: true,
    id: "5",
    title: "Ass. skipskokk",
    tag: {
      variant: "success",
      text: "Venter på Nav",
    },
    actionText: "Les mer om stillingen",
  },
  {
    category: "Stilling fra Nav",
    description:
      "Nav hjelper en arbeidsgiver med å finne kandidater til en stilling, og tror den kan passe for deg.",
    employer: "Havsalt AS",
    location: "Kristiansand",
    hasChange: true,
    id: "4",
    title: "Servitør",
    tag: {
      variant: "success",
      text: "Venter på Nav",
    },
    actionText: "Les mer om stillingen",
  },
  {
    category: "Stilling fra Nav",
    description:
      "Nav hjelper en arbeidsgiver med å finne kandidater til en stilling, og tror den kan passe for deg.",
    employer: "Havsalt AS",
    location: "Kristiansand",
    id: "7",
    title: "Greve av Gral",
    tag: {
      variant: "neutral",
      text: "Ikke fått jobben",
    },
    actionText: "Les mer om stillingen",
  },
];

export { activities };
