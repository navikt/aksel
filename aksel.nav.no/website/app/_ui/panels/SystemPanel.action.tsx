"use client";

import { useEffect, useState } from "react";
import { BodyLong, Button, Link, VStack } from "@navikt/ds-react";
import { clientConfig } from "@/sanity/config";
import styles from "./SystemPanel.module.css";

function SystemPanelAction() {
  return (
    <div className={styles.systemPanelAction}>
      <Button
        size="small"
        variant="secondary-neutral"
        as="a"
        href="https://github.com/navikt/aksel/issues/new?labels=foresp%C3%B8rsel+%F0%9F%A5%B0%2Ckomponenter+%F0%9F%A7%A9%2Cbeta+%F0%9F%A7%AA&template=update-component.yml&title=%5BInnspill+til+komponent%5D%3A+%3CActionMenu%20/%3E"
      >
        Send innspill
      </Button>
    </div>
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
        href={`https://aksel.nav.no/admin/prod/intent/edit/id=${docId}`}
        target="_blank"
        size="small"
        variant="secondary-neutral"
      >
        Har du lyst til å kontrollere innholdet nå?
      </Button>
    </VStack>
  );
}

export { SystemPanelOutdatedAction, SystemPanelAction };
