"use client";

import { stegaClean } from "next-sanity";
import { useEffect, useState } from "react";
import { BodyLong, Box, Button, Link, VStack } from "@navikt/ds-react";
import { AnimatedArrowRight } from "@/app/_ui/animated-arrow/AnimatedArrow";
import { clientConfig } from "@/sanity/config";

function SystemPanelAction() {
  return (
    <Box marginBlock="space-20 0">
      <Button
        size="small"
        variant="secondary-neutral"
        as="a"
        href="https://github.com/navikt/aksel/issues/new?labels=foresp%C3%B8rsel+%F0%9F%A5%B0%2Ckomponenter+%F0%9F%A7%A9%2Cbeta+%F0%9F%A7%AA&template=update-component.yml&title=%5BInnspill+til+komponent%5D%3A+%3CActionMenu%20/%3E"
      >
        Send innspill
      </Button>
    </Box>
  );
}

function SystemPanelOutdatedAction({ docId }: { docId?: string }) {
  const [user, setUser] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `https://${clientConfig.projectId}.api.sanity.io/v1/users/me`,
        {
          credentials: "include",
        },
      ).then((x) => x.text());
      try {
        setUser(!!JSON.parse(response)?.id);
        return;
      } catch {
        setUser(false);
      }
      setUser(false);
    };
    fetchUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <VStack marginBlock="space-4 space-0" gap="space-20" align="start">
      <BodyLong>
        <Link
          href="https://aksel.nav.no/side/skriv-for-aksel#a5b79ddd59da"
          variant="neutral"
        >
          Hvordan oppdatere innhold i Sanity
        </Link>
      </BodyLong>

      <Button
        as="a"
        href={`https://aksel.nav.no/admin/prod/intent/edit/id=${stegaClean(docId)}`}
        target="_blank"
        size="small"
        variant="secondary-neutral"
        iconPosition="right"
        data-animated-arrow-anchor
        icon={<AnimatedArrowRight />}
      >
        Kontroller innholdet nå
      </Button>
    </VStack>
  );
}

export { SystemPanelAction, SystemPanelOutdatedAction };
