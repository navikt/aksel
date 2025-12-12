import { type StyleDictionaryTokenConfig } from "../../../tokens.util";

export const accentSemanticTokenConfig = {
  bg: {
    "accent-soft": {
      value: "{ax.accent.100.value}",
      type: "color",
      group: "background.accent",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav.",
    },
    "accent-softA": {
      value: "{ax.accent.100A.value}",
      type: "color",
      group: "background.accent",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav. Er delvis gjennomsiktig.",
    },
    "accent-moderate": {
      value: "{ax.accent.200.value}",
      type: "color",
      group: "background.accent",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border.",
    },
    "accent-moderateA": {
      value: "{ax.accent.200A.value}",
      type: "color",
      group: "background.accent",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "accent-moderate-hover": {
      value: "{ax.accent.300.value}",
      type: "color",
      group: "background.accent",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "accent-moderate-hoverA": {
      value: "{ax.accent.300A.value}",
      type: "color",
      group: "background.accent",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer (f.eks. button accent secondary hover). Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "accent-moderate-pressed": {
      value: "{ax.accent.400.value}",
      type: "color",
      group: "background.accent",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "accent-moderate-pressedA": {
      value: "{ax.accent.400A.value}",
      type: "color",
      group: "background.accent",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer (f.eks. button accent secondary active). Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "accent-strong": {
      value: "{ax.accent.600.value}",
      type: "color",
      group: "background.accent",
      comment:
        "En sterk bakgrunnsfarge som brukes på meningsbærende elementer (f.eks. button accent primary).",
    },
    "accent-strong-hover": {
      value: "{ax.accent.700.value}",
      type: "color",
      group: "background.accent",
      comment:
        "En sterk bakgrunnsfarge som brukes til hover-state på meningsbærende elementer (f.eks. button accent primary hover).",
    },
    "accent-strong-pressed": {
      value: "{ax.accent.800.value}",
      type: "color",
      group: "background.accent",
      comment:
        "En sterk bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer (f.eks. button accent primary active).",
    },
  },
  text: {
    accent: {
      value: "{ax.accent.1000.value}",
      type: "color",
      group: "text.accent",
      comment:
        "Sterk farge for tekst og ikoner for rollen accent. Godkjent på alle bakgrunner unntatt strong.",
    },
    "accent-subtle": {
      value: "{ax.accent.800.value}",
      type: "color",
      group: "text.accent",
      comment:
        "Standard farge for tekst og ikoner med rollen accent. Godkjent på alle bakgrunner unntatt strong.",
    },
    "accent-decoration": {
      value: "{ax.accent.600.value}",
      type: "color",
      group: "text.accent",
      comment:
        "En farge som kun brukes på ikke-tekstlig innhold (ikoner og andre grafiske elementer). **Ikke godkjent på tekst altså**.",
    },
    "accent-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.accent",
      comment:
        "En farge som brukes på tekst og ikoner som plasseres oppå bakgrunnen strong (f.eks. button accent primary).",
    },
  },
  border: {
    accent: {
      value: "{ax.accent.600.value}",
      type: "color",
      group: "border.accent",
      comment: "Standard farge for border.",
    },
    "accent-subtle": {
      value: "{ax.accent.400.value}",
      type: "color",
      group: "border.accent",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon.",
    },
    "accent-subtleA": {
      value: "{ax.accent.400A.value}",
      type: "color",
      group: "border.accent",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon. Er delvis gjennomsiktig.",
    },
    "accent-strong": {
      value: "{ax.accent.700.value}",
      type: "color",
      group: "border.accent",
      comment:
        "En sterk border-farge. Kan brukes som hover-state til border-default.",
    },
  },
} satisfies StyleDictionaryTokenConfig<"color">;
