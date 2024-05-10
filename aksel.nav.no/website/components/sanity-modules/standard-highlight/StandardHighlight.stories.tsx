import type { Meta, StoryObj } from "@storybook/react";
import { AkselTheme } from "@/sb-util";
import StandardHightlight from "./StandardHightlight";

const meta = {
  title: "Sanity-modules/StandardHightlight",
  component: StandardHightlight,
  tags: ["autodocs"],
} satisfies Meta<typeof StandardHightlight>;

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
