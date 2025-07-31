import { type StyleDictionaryTokenConfig } from "../../../tokens.util";

export const metaLimeSemanticTokenConfig = {
  bg: {
    "meta-lime-soft": {
      value: "{ax.meta-lime.100.value}",
      type: "color",
      group: "background.meta-lime",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav.",
    },
    "meta-lime-softA": {
      value: "{ax.meta-lime.100A.value}",
      type: "color",
      group: "background.meta-lime",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav. Er delvis gjennomsiktig.",
    },
    "meta-lime-moderate": {
      value: "{ax.meta-lime.200.value}",
      type: "color",
      group: "background.meta-lime",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border.",
    },
    "meta-lime-moderateA": {
      value: "{ax.meta-lime.200A.value}",
      type: "color",
      group: "background.meta-lime",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "meta-lime-moderate-hover": {
      value: "{ax.meta-lime.300.value}",
      type: "color",
      group: "background.meta-lime",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "meta-lime-moderate-hoverA": {
      value: "{ax.meta-lime.300A.value}",
      type: "color",
      group: "background.meta-lime",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "meta-lime-moderate-pressed": {
      value: "{ax.meta-lime.400.value}",
      type: "color",
      group: "background.meta-lime",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "meta-lime-moderate-pressedA": {
      value: "{ax.meta-lime.400A.value}",
      type: "color",
      group: "background.meta-lime",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "meta-lime-strong": {
      value: "{ax.meta-lime.600.value}",
      type: "color",
      group: "background.meta-lime",
      comment:
        "En sterk bakgrunnsfarge som brukes på meningsbærende elementer.",
    },
    "meta-lime-strong-hover": {
      value: "{ax.meta-lime.700.value}",
      type: "color",
      group: "background.meta-lime",
      comment:
        "En sterk bakgrunnsfarge som brukes til hover-state på meningsbærende elementer.",
    },
    "meta-lime-strong-pressed": {
      value: "{ax.meta-lime.800.value}",
      type: "color",
      group: "background.meta-lime",
      comment:
        "En sterk bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer.",
    },
  },
  text: {
    "meta-lime": {
      value: "{ax.meta-lime.1000.value}",
      type: "color",
      group: "text.meta-lime",
      comment:
        "Sterk farge for tekst og ikoner for rollen meta lime. Godkjent på alle bakgrunner unntatt strong.",
    },
    "meta-lime-subtle": {
      value: "{ax.meta-lime.800.value}",
      type: "color",
      group: "text.meta-lime",
      comment:
        "Standard farge for tekst og ikoner med rollen meta lime. Godkjent på alle bakgrunner unntatt strong.",
    },
    "meta-lime-decoration": {
      value: "{ax.meta-lime.600.value}",
      type: "color",
      group: "text.meta-lime",
      comment:
        "En farge som kun brukes på ikke-tekstlig innhold (ikoner og andre grafiske elementer). **Ikke godkjent på tekst altså**.",
    },
    "meta-lime-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.meta-lime",
      comment:
        "En farge som brukes på tekst og ikoner som plasseres oppå bakgrunnen strong.",
    },
  },
  border: {
    "meta-lime": {
      value: "{ax.meta-lime.600.value}",
      type: "color",
      group: "border.meta-lime",
      comment: "Standard farge for border.",
    },
    "meta-lime-subtle": {
      value: "{ax.meta-lime.400.value}",
      type: "color",
      group: "border.meta-lime",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon.",
    },
    "meta-lime-subtleA": {
      value: "{ax.meta-lime.400A.value}",
      type: "color",
      group: "border.meta-lime",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon. Er delvis gjennomsiktig.",
    },
    "meta-lime-strong": {
      value: "{ax.meta-lime.700.value}",
      type: "color",
      group: "border.meta-lime",
      comment:
        "En sterk border-farge. Kan brukes som hover-state til border-default.",
    },
  },
} satisfies StyleDictionaryTokenConfig<"color">;
