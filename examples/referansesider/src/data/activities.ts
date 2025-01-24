import { TagProps } from "@navikt/ds-react";

export type Activity = {
  category: string;
  title: string;
  date?: { start: string; end?: string };
  description: string;
  employer: string;
  hasChange?: boolean;
  id: string;
  location: string;
  tag?: { variant: TagProps["variant"]; text: string };
};

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
    title: "Medisinsk behandling",
    date: {
      start: "13.09.2022",
      end: "14.09.2022",
    },
    description: "",
    employer: "",
    location: "",
    id: "2",
    tag: { variant: "info-filled", text: "Avtalt med Nav" },
  },
  {
    category: "Møte med Nav",
    description: "",
    employer: "",
    location: "",
    title: "Beste møtet ever",
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
