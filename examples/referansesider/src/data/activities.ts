import { TagProps } from "@navikt/ds-react";

export interface BaseActivity {
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
    tag: {
      variant: "success",
      text: "Venter på å bli kontaktet",
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
    description: "",
    id: "2",
    tag: { variant: "info-filled", text: "Avtalt med Nav" },
  },
  {
    category: "Møte med Nav",
    description: "",
    location: "Oslo",
    title: "Beste møtet ever",
    time: "13:00",
    length: "30 min",
    meetingForm: "Fysisk møte",
    date: {
      start: "21.08.2030",
    },
    id: "3",
  },
  {
    category: "Stilling fra Nav",
    description: "",
    employer: "",
    location: "",
    hasChange: true,
    id: "4",
    title: "Servitør",
    tag: {
      variant: "success",
      text: "Venter på å bli kontaktet",
    },
  },
  {
    category: "Stilling fra Nav",
    description: "",
    employer: "",
    location: "",
    hasChange: true,
    id: "5",
    title: "Assisterende skipskokk",
    tag: {
      variant: "success",
      text: "Venter på å bli kontaktet",
    },
  },
  {
    category: "Stilling fra Nav",
    description: "",
    employer: "",
    location: "",
    hasChange: true,
    id: "6",
    title: "Servitør",
    tag: {
      variant: "success",
      text: "Venter på å bli kontaktet",
    },
  },
  {
    category: "Stilling fra Nav",
    description: "",
    employer: "",
    location: "",
    id: "7",
    title: "Greve av Gral",
    tag: {
      variant: "neutral",
      text: "Ikke fått jobben",
    },
  },
];

export { activities };
