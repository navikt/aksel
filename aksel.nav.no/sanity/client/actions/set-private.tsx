import { EyeScreened } from "@navikt/ds-icons";
import { BodyLong, Button } from "@navikt/ds-react";
import React from "react";
const sanityClient = require("@sanity/client");
const SanityConfig = require("../../sanity.json");

const client = sanityClient({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2021-08-21",
  withCredentials: true,
});

export default function SetPrivateAction(props) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const isPrivate =
    props?.published?.tilgang?.privat ?? props?.draft?.tilgang?.privat;

  const handlePatch = async (dir: boolean) => {
    props?.published &&
      (await client
        .patch(props.id)
        .set({ tilgang: { privat: dir } })
        .commit()
        .catch((err) => {
          console.error(err.message);
        }));
    props?.draft &&
      (await client
        .patch(props.draft._id)
        .set({ tilgang: { privat: dir } })
        .commit()
        .catch((err) => {
          console.error(err.message);
        }));
    props.onComplete();
  };

  return {
    label: isPrivate ? "Åpne side for alle" : "Skjul side bak innlogging",
    /* color: "success",
    icon: PublishIcon, */
    icon: EyeScreened,

    onHandle: async () => {
      setDialogOpen(true);
    },
    dialog: isDialogOpen && {
      type: "modal",
      onClose: props.onComplete,
      header: isPrivate
        ? "Åpne innhold for alle"
        : "Gjemme innhold bak innlogging",
      content: (
        <div>
          {isPrivate ? (
            <BodyLong spacing>
              Innholdet gjøres nå tilgjengelig for alle utenfor NAV! Dette kan
              medføre konsekvenser siden innholdet i artikkelen blir
              tilgjengelig for alle. Innhold som NAV potensielt ikke ønsker å
              dele offentlig kan medføre eks omdømmetap og uønsket oppmerksomhet
              utenfra. Dobbelsjekk med temaansvarlig og andre som har skrevet
              artikkelen før du velger å åpne innholdet for alle. Er du usikker
              er det bare å sende en melding på #aksel eller #aksel-redaktører
              på slack.
            </BodyLong>
          ) : (
            <>
              <BodyLong spacing>
                Innholdet gjøres nå bare tilgjengelig for NAV-ansatte. Alt
                utenom "innhold" vil fortsatt være tilgjengelig for alle. Dette
                inkluderer alle bilder som er lastet opp til sanity også! Husk
                at ingen "sikker" data skal skrives i Aksel, og at
                innloggings-barrieren er ment for å kunne dele innhold som vi
                ikke er helt trygg på å dele med alle.
              </BodyLong>
              Dette vil fortsatt være åpent for alle
              <ul>
                <li>Sidetittel</li>
                <li>Ingress</li>
                <li>Redaktører</li>
                <li>Bilder/filer</li>
                <li>SEO</li>
              </ul>
              Dette vil bare være tilgjengelig for NAV-ansatte
              <ul>
                <li>"Innhold"-blokken</li>
              </ul>
            </>
          )}
          <div style={{ display: "flex", gap: "6px", marginTop: 8 }}>
            {isPrivate ? (
              <>
                <Button
                  onClick={() => {
                    setDialogOpen(false);
                    handlePatch(false);
                  }}
                >
                  Åpne innholdet for alle
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDialogOpen(false);
                    props.onComplete();
                  }}
                >
                  Avbryt
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setDialogOpen(false);
                    handlePatch(true);
                  }}
                >
                  Skjul innholdet bak innlogging
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDialogOpen(false);
                    props.onComplete();
                  }}
                >
                  Avbryt
                </Button>
              </>
            )}
          </div>
        </div>
      ),
    },
  };
}
