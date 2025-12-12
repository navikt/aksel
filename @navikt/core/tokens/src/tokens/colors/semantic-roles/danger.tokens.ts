import { type StyleDictionaryTokenConfig } from "../../../tokens.util";

export const dangerSemanticTokenConfig = {
  bg: {
    "danger-soft": {
      value: "{ax.danger.100.value}",
      type: "color",
      group: "background.danger",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav.",
    },
    "danger-softA": {
      value: "{ax.danger.100A.value}",
      type: "color",
      group: "background.danger",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav. Er delvis gjennomsiktig.",
    },
    "danger-moderate": {
      value: "{ax.danger.200.value}",
      type: "color",
      group: "background.danger",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border (f.eks. alert error).",
    },
    "danger-moderateA": {
      value: "{ax.danger.200A.value}",
      type: "color",
      group: "background.danger",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "danger-moderate-hover": {
      value: "{ax.danger.300.value}",
      type: "color",
      group: "background.danger",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "danger-moderate-hoverA": {
      value: "{ax.danger.300A.value}",
      type: "color",
      group: "background.danger",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "danger-moderate-pressed": {
      value: "{ax.danger.400.value}",
      type: "color",
      group: "background.danger",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "danger-moderate-pressedA": {
      value: "{ax.danger.400A.value}",
      type: "color",
      group: "background.danger",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "danger-strong": {
      value: "{ax.danger.600.value}",
      type: "color",
      group: "background.danger",
      comment:
        "En sterk bakgrunnsfarge som brukes på meningsbærende elementer (f.eks. button danger primary).",
    },
    "danger-strong-hover": {
      value: "{ax.danger.700.value}",
      type: "color",
      group: "background.danger",
      comment:
        "En sterk bakgrunnsfarge som brukes til hover-state på meningsbærende elementer (f.eks. button danger primary hover).",
    },
    "danger-strong-pressed": {
      value: "{ax.danger.800.value}",
      type: "color",
      group: "background.danger",
      comment:
        "En sterk bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer (f.eks. button danger primary active).",
    },
  },
  text: {
    danger: {
      value: "{ax.danger.1000.value}",
      type: "color",
      group: "text.danger",
      comment:
        "Sterk farge for tekst og ikoner for rollen danger. Godkjent på alle bakgrunner unntatt strong.",
    },
    "danger-subtle": {
      value: "{ax.danger.800.value}",
      type: "color",
      group: "text.danger",
      comment:
        "Standard farge for tekst og ikoner med rollen danger. Godkjent på alle bakgrunner unntatt strong.",
    },
    "danger-decoration": {
      value: "{ax.danger.600.value}",
      type: "color",
      group: "text.danger",
      comment:
        "En farge som kun brukes på ikke-tekstlig innhold (ikoner og andre grafiske elementer). **Ikke godkjent på tekst altså**.",
    },
    "danger-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.danger",
      comment:
        "En farge som brukes på tekst og ikoner som plasseres oppå bakgrunnen strong (f.eks. button danger primary).",
    },
  },
  border: {
    danger: {
      value: "{ax.danger.600.value}",
      type: "color",
      group: "border.danger",
      comment: "Standard farge for border.",
    },
    "danger-subtle": {
      value: "{ax.danger.400.value}",
      type: "color",
      group: "border.danger",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon.",
    },
    "danger-subtleA": {
      value: "{ax.danger.400A.value}",
      type: "color",
      group: "border.danger",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon. Er delvis gjennomsiktig.",
    },
    "danger-strong": {
      value: "{ax.danger.700.value}",
      type: "color",
      group: "border.danger",
      comment:
        "En sterk border-farge. Kan brukes som hover-state til border-default.",
    },
  },
} satisfies StyleDictionaryTokenConfig<"color">;
