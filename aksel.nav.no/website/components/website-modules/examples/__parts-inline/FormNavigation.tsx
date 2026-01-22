import {
  ArrowLeftIcon,
  FloppydiskIcon,
  PaperplaneIcon,
  TrashIcon,
} from "@navikt/aksel-icons";
import {
  BodyShort,
  Box,
  Button,
  HGrid,
  Hide,
  Show,
  VStack,
} from "@navikt/ds-react";

const FormNavigation = () => (
  <VStack gap="space-16">
    <BodyShort as="div" size="small" textColor="subtle">
      Sist lagret: 10. mars 2024 kl. 13.55
    </BodyShort>
    <HGrid
      gap={{ xs: "space-16", sm: "space-32 space-16" }}
      columns={{ xs: 1, sm: 2 }}
      width={{ sm: "fit-content" }}
    >
      <Hide above="sm" asChild>
        <Button
          variant="primary"
          icon={<PaperplaneIcon aria-hidden />}
          iconPosition="right"
        >
          Send søknad
        </Button>
      </Hide>
      <Button
        variant="secondary"
        icon={<ArrowLeftIcon aria-hidden />}
        iconPosition="left"
      >
        Forrige steg
      </Button>
      <Show above="sm" asChild>
        <Button
          variant="primary"
          icon={<PaperplaneIcon aria-hidden />}
          iconPosition="right"
        >
          Send søknad
        </Button>
      </Show>

      <Box asChild marginBlock={{ xs: "space-16 space-0", sm: "space-0" }}>
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
