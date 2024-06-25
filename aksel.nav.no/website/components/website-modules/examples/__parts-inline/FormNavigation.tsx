import React from "react";
import {
  ArrowLeftIcon,
  FloppydiskIcon,
  PaperplaneIcon,
  TrashIcon,
} from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HGrid, VStack } from "@navikt/ds-react";

const FormNavigation = () => (
  <VStack gap="4">
    <BodyShort as="div" size="small" textColor="subtle">
      Sist lagret: 10. mars 2024 kl. 13.55
    </BodyShort>
    <HGrid
      gap={{ xs: "4", sm: "8 4" }}
      columns={{ xs: 1, sm: 2 }}
      width={{ sm: "fit-content" }}
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

      <Box asChild marginBlock={{ xs: "4 0", sm: "0" }}>
        <Button
          variant="tertiary"
          icon={<FloppydiskIcon aria-hidden />}
          iconPosition="left"
        >
          Fortsett senere
        </Button>
      </Box>
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
