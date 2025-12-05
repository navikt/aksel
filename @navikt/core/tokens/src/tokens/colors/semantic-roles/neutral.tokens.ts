import { type StyleDictionaryTokenConfig } from "../../../tokens.util";

export const neutralSemanticTokenConfig = {
  bg: {
    "neutral-soft": {
      value: "{ax.neutral.100.value}",
      type: "color",
      group: "background.neutral",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav.",
    },
    "neutral-softA": {
      value: "{ax.neutral.100A.value}",
      type: "color",
      group: "background.neutral",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav. Er delvis gjennomsiktig.",
    },
    "neutral-moderate": {
      value: "{ax.neutral.200.value}",
      type: "color",
      group: "background.neutral",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border.",
    },
    "neutral-moderateA": {
      value: "{ax.neutral.200A.value}",
      type: "color",
      group: "background.neutral",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "neutral-moderate-hover": {
      value: "{ax.neutral.300.value}",
      type: "color",
      group: "background.neutral",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "neutral-moderate-hoverA": {
      value: "{ax.neutral.300A.value}",
      type: "color",
      group: "background.neutral",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer (f.eks. button neutral secondary hover). Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "neutral-moderate-pressed": {
      value: "{ax.neutral.400.value}",
      type: "color",
      group: "background.neutral",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "neutral-moderate-pressedA": {
      value: "{ax.neutral.400A.value}",
      type: "color",
      group: "background.neutral",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer (f.eks. button neutral secondary active). Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "neutral-strong": {
      value: "{ax.neutral.700.value}",
      type: "color",
      group: "background.neutral",
      comment:
        "En sterk bakgrunnsfarge som brukes på meningsbærende elementer (f.eks. button neutral primary).",
    },
    "neutral-strong-hover": {
      value: "{ax.neutral.800.value}",
      type: "color",
      group: "background.neutral",
      comment:
        "En sterk bakgrunnsfarge som brukes til hover-state på meningsbærende elementer (f.eks. button neutral primary hover).",
    },
    "neutral-strong-pressed": {
      value: "{ax.neutral.900.value}",
      type: "color",
      group: "background.neutral",
      comment:
        "En sterk bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer (f.eks. button neutral primary active).",
    },
  },
  text: {
    neutral: {
      value: "{ax.neutral.1000.value}",
      type: "color",
      group: "text.neutral",
      comment:
        "Standard farge for tekst og ikoner med rollen neutral. Godkjent på alle bakgrunner unntatt strong.",
    },
    "neutral-subtle": {
      value: "{ax.neutral.900.value}",
      type: "color",
      group: "text.neutral",
      comment:
        "En nedtonet farge for tekst og ikoner med rollen neutral. Godkjent på alle bakgrunner unntatt strong.",
    },
    "neutral-decoration": {
      value: "{ax.neutral.600.value}",
      type: "color",
      group: "text.neutral",
      comment:
        "En farge som kun brukes på ikke-tekstlig innhold (ikoner og andre grafiske elementer). **Ikke godkjent på tekst altså**.",
    },
    "neutral-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.neutral",
      comment:
        "En farge som brukes på tekst og ikoner som plasseres oppå bakgrunnen strong (f.eks. button neutral primary).",
    },
  },
  border: {
    neutral: {
      value: "{ax.neutral.600.value}",
      type: "color",
      group: "border.neutral",
      comment: "Standard farge for border.",
    },
    "neutral-subtle": {
      value: "{ax.neutral.400.value}",
      type: "color",
      group: "border.neutral",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon.",
    },
    "neutral-subtleA": {
      value: "{ax.neutral.400A.value}",
      type: "color",
      group: "border.neutral",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon. Er delvis gjennomsiktig.",
    },
    "neutral-strong": {
      value: "{ax.neutral.700.value}",
      type: "color",
      group: "border.neutral",
      comment:
        "En sterk border-farge. Kan brukes som hover-state til border-default.",
    },
  },
} satisfies StyleDictionaryTokenConfig<"color">;
