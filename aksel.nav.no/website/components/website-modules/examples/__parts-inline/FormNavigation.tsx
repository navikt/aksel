import React from "react";
import {
  ArrowLeftIcon,
  FloppydiskIcon,
  PaperplaneIcon,
  TrashIcon,
} from "@navikt/aksel-icons";
import { BodyShort, Button, HGrid, Show, VStack } from "@navikt/ds-react";

const FormNavigation = () => (
  <VStack gap="4">
    <BodyShort as="div" size="small" textColor="subtle">
      Sist lagret: 10. mars 2024 kl. 13.55
    </BodyShort>
    <HGrid
      gap={{ xs: "4", sm: "8 4" }}
      columns={{ xs: 1, sm: 2 }}
      style={{ width: "fit-content" }} // TODO: Kun på sm
    >
      <Button
        variant="secondary"
        icon={<ArrowLeftIcon aria-hidden />}
        iconPosition="left"
      >
        Forrige steg
      </Button>
      <Button
        variant="primary"
        icon={<PaperplaneIcon aria-hidden />}
        iconPosition="right"
      >
        Send søknad
      </Button>

      <Show below="sm">
        <div />
      </Show>

      <Button
        variant="tertiary"
        icon={<FloppydiskIcon aria-hidden />}
        iconPosition="left"
      >
        Fortsett senere
      </Button>
      <Button
        variant="tertiary"
        icon={<TrashIcon aria-hidden />}
        iconPosition="left"
      >
        Slett søknaden
      </Button>
    </HGrid>
  </VStack>
);

export default FormNavigation;
