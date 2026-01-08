import { type StyleDictionaryTokenConfig } from "../../../tokens.util";

export const infoSemanticTokenConfig = {
  bg: {
    "info-soft": {
      value: "{ax.info.100.value}",
      type: "color",
      group: "background.info",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav.",
    },
    "info-softA": {
      value: "{ax.info.100A.value}",
      type: "color",
      group: "background.info",
      comment:
        "En svak bakgrunnsfarge som kun brukes til dekor. Dekker ingen kontrastkrav. Er delvis gjennomsiktig.",
    },
    "info-moderate": {
      value: "{ax.info.200.value}",
      type: "color",
      group: "background.info",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border (f.eks. alert info).",
    },
    "info-moderateA": {
      value: "{ax.info.200A.value}",
      type: "color",
      group: "background.info",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til dekor. Om den brukes på meningsbærende elementer må den kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "info-moderate-hover": {
      value: "{ax.info.300.value}",
      type: "color",
      group: "background.info",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "info-moderate-hoverA": {
      value: "{ax.info.300A.value}",
      type: "color",
      group: "background.info",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til hover-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "info-moderate-pressed": {
      value: "{ax.info.400.value}",
      type: "color",
      group: "background.info",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border.",
    },
    "info-moderate-pressedA": {
      value: "{ax.info.400A.value}",
      type: "color",
      group: "background.info",
      comment:
        "En medium-svak bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer. Må kombineres med en godkjent border. Er delvis gjennomsiktig.",
    },
    "info-strong": {
      value: "{ax.info.600.value}",
      type: "color",
      group: "background.info",
      comment:
        "En sterk bakgrunnsfarge som brukes på meningsbærende elementer.",
    },
    "info-strong-hover": {
      value: "{ax.info.700.value}",
      type: "color",
      group: "background.info",
      comment:
        "En sterk bakgrunnsfarge som brukes til hover-state på meningsbærende elementer.",
    },
    "info-strong-pressed": {
      value: "{ax.info.800.value}",
      type: "color",
      group: "background.info",
      comment:
        "En sterk bakgrunnsfarge som brukes til active/selected-state på meningsbærende elementer.",
    },
  },
  text: {
    info: {
      value: "{ax.info.1000.value}",
      type: "color",
      group: "text.info",
      comment:
        "Sterk farge for tekst og ikoner for rollen info. Godkjent på alle bakgrunner unntatt strong.",
    },
    "info-subtle": {
      value: "{ax.info.800.value}",
      type: "color",
      group: "text.info",
      comment:
        "Standard farge for tekst og ikoner med rollen info. Godkjent på alle bakgrunner unntatt strong.",
    },
    "info-decoration": {
      value: "{ax.info.600.value}",
      type: "color",
      group: "text.info",
      comment:
        "En farge som kun brukes på ikke-tekstlig innhold (ikoner og andre grafiske elementer). **Ikke godkjent på tekst altså**.",
    },
    "info-contrast": {
      value: "{ax.neutral.000.value}",
      type: "color",
      group: "text.info",
      comment:
        "En farge som brukes på tekst og ikoner som plasseres oppå bakgrunnen strong.",
    },
  },
  border: {
    info: {
      value: "{ax.info.600.value}",
      type: "color",
      group: "border.info",
      comment: "Standard farge for border.",
    },
    "info-subtle": {
      value: "{ax.info.400.value}",
      type: "color",
      group: "border.info",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon.",
    },
    "info-subtleA": {
      value: "{ax.info.400A.value}",
      type: "color",
      group: "border.info",
      comment:
        "En svak border-farge som brukes til dekor. Om den brukes på interaktive elementer må den kombineres med elementer som tydelig signaliserer interaksjon. Er delvis gjennomsiktig.",
    },
    "info-strong": {
      value: "{ax.info.700.value}",
      type: "color",
      group: "border.info",
      comment:
        "En sterk border-farge. Kan brukes som hover-state til border-default.",
    },
  },
} satisfies StyleDictionaryTokenConfig<"color">;
