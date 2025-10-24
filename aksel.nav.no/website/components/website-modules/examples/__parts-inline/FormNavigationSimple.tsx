import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button, HGrid, Hide, Show } from "@navikt/ds-react";

const FormNavigationSimple = () => (
  <HGrid
    gap={{ xs: "space-16", sm: "space-32 space-16" }}
    columns={{ xs: 1, sm: 2 }}
    width={{ sm: "fit-content" }}
  >
    <Hide above="sm" asChild>
      <Button
        variant="primary"
        icon={<ArrowRightIcon aria-hidden />}
        iconPosition="right"
      >
        Neste steg
      </Button>
    </Hide>
    <Button
      type="button"
      variant="secondary"
      icon={<ArrowLeftIcon aria-hidden />}
      iconPosition="left"
    >
      Forrige steg
    </Button>
    <Show above="sm" asChild>
      <Button
        variant="primary"
        icon={<ArrowRightIcon aria-hidden />}
        iconPosition="right"
      >
        Neste steg
      </Button>
    </Show>
  </HGrid>
);

export default FormNavigationSimple;
