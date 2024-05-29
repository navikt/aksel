import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme } from "@/sb-util";
import ExampletextBlock from "./ExampletextBlock";

const meta = {
  title: "Sanity-modules/ExampletextBlock",
  component: ExampletextBlock,
  tags: ["autodocs"],
} satisfies Meta<typeof ExampletextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Aksel: Story = {
  args: {
    node: {
      title: "Eksempeltekst for ABC",
      text: "Jeg er her for å veilede deg gjennom søknaden. Svarene dine lagres underveis, slik at du trygt kan gå tilbake og endre dem.\n\nArbeidsavklaringspenger forkortes ofte med “AAP”.\n\nAAP skal sikre deg inntekt når du på grunn av sykdom eller skade har behov for å få avklart mulighetene dine til å jobbe. Les mer om AAP, hvem som kan søke og hva du kan få på nav.no (åpnes i ny fane).",
    },
  },
  decorators: [AkselTheme],
};

export const ReadMore: Story = {
  args: {
    node: {
      readMore: true,
      title: "Eksempeltekst",
      text: "[H2] Her kan du søke om\n\n- Alderspensjon\n\n- Avtalefestet pensjon (AFP) i privat sektor\n\nDu kan lese mer om AFP i privat sektor hos Fellesordningen for AFP\n\n[H3] Dette kan du ikke søke om her\n\n- Avtalefestet pensjon (AFP) i offentlig sektor [lenke]\n\n- Tjenestepensjon [lenke]\n\nDu kan ikke kombinere AFP i offentlig sektor og alderspensjon.",
    },
  },
  decorators: [AkselTheme],
};
