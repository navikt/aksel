import { type StyleDictionaryTokenConfig } from "../../../tokens.util";

export const metaPurpleSemanticTokenConfig = {
  bg: {
    "meta-purple-soft": {
      value: "{ax.meta-purple.100.value}",
      type: "color",
      group: "background.meta-purple",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav.",
    },
    "meta-purple-softA": {
      value: "{ax.meta-purple.100A.value}",
      type: "color",
      group: "background.meta-purple",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav. Er delvis gjennomsiktig.",
    },
    "meta-purple-moderate": {
      value: "{ax.meta-purple.200.value}",
      type: "color",
      group: "background.meta-purple",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border.",
    },
    "meta-purple-moderateA": {
      value: "{ax.meta-purple.200A.value}",
      type: "color",
      group: "background.meta-purple",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "meta-purple-moderate-hover": {
      value: "{ax.meta-purple.300.value}",
      type: "color",
      group: "background.meta-purple",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "meta-purple-moderate-hoverA": {
      value: "{ax.meta-purple.300A.value}",
      type: "color",
      group: "background.meta-purple",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "meta-purple-moderate-pressed": {
      value: "{ax.meta-purple.400.value}",
      type: "color",
      group: "background.meta-purple",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "meta-purple-moderate-pressedA": {
      value: "{ax.meta-purple.400A.value}",
      type: "color",
      group: "background.meta-purple",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "meta-purple-strong": {
      value: "{ax.meta-purple.600.value}",
      type: "color",
      group: "background.meta-purple",
      comment:
        "En sterk bakgrunnsfarge som brukes på meningsbærende elementer.",
    },
    "meta-purple-strong-hover": {
      value: "{ax.meta-purple.700.value}",
      type: "color",
      group: "background.meta-purple",
      comment:
        "En sterk bakgrunnsfarge som brukes til hover-state på meningsbærende elementer.",
    },
    "meta-purple-strong-pressed": {
      value: "{ax.meta-purple.800.value}",
      type: "color",
      group: "background.meta-purple",
      comment:
        "En sterk bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer.",
    },
  },
  text: {
    "meta-purple": {
      value: "{ax.meta-purple.1000.value}",
      type: "color",
      group: "text.meta-purple",
      comment:
        "Sterk farge for tekst og ikoner for rollen meta purple. Godkjent på alle bakgrunner unntatt strong.",
    },
    "meta-purple-subtle": {
      value: "{ax.meta-purple.800.value}",
      type: "color",
      group: "text.meta-purple",
      comment:
        "Standard farge for tekst og ikoner med rollen meta purple. Godkjent på alle bakgrunner unntatt strong.",
    },
    "meta-purple-decoration": {
      value: "{ax.meta-purple.600.value}",
      type: "color",
      group: "text.meta-purple",
      comment:
        "En farge som kun brukes på ikke-tekstlig innhold (ikoner og andre grafiske elementer). **Ikke godkjent på tekst altså**.",
    },
    "meta-purple-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.meta-purple",
      comment:
        "En farge som brukes på tekst og ikoner som plasseres oppå bakgrunnen strong.",
    },
  },
  border: {
    "meta-purple": {
      value: "{ax.meta-purple.600.value}",
      type: "color",
      group: "border.meta-purple",
      comment: "Standard farge for border.",
    },
    "meta-purple-subtle": {
      value: "{ax.meta-purple.400.value}",
      type: "color",
      group: "border.meta-purple",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon.",
    },
    "meta-purple-subtleA": {
      value: "{ax.meta-purple.400A.value}",
      type: "color",
      group: "border.meta-purple",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon. Er delvis gjennomsiktig.",
    },
    "meta-purple-strong": {
      value: "{ax.meta-purple.700.value}",
      type: "color",
      group: "border.meta-purple",
      comment:
        "En sterk border-farge. Kan brukes som hover-state til border-default.",
    },
  },
} satisfies StyleDictionaryTokenConfig<"color">;
