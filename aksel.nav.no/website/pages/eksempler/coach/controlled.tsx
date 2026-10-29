import { useRef, useState } from "react";
import { Button, Coach } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const opprettRef = useRef<HTMLButtonElement>(null);
  const [showTour, setShowTour] = useState(false);

  return (
    <>
      <Button onClick={() => setShowTour(true)} ref={opprettRef}>
        Opprett oppgave
      </Button>
      <Coach
        disableTour={true}
        showTour={showTour}
        onShowTourChange={setShowTour}
        steps={[
          {
            id: "velkommen",
            type: "dialog",
            allowToEndTour: true,
            title: "Velkommen til oppgavelisten!",
            description:
              "Her får du oversikt over oppgavene dine. Vi viser deg hvordan du legger til oppgaver og finner dem som gjenstår.",
          },
          {
            id: "opprett",
            type: "anchor",
            anchorRef: opprettRef,
            placement: "bottom-end",
            allowToEndTour: true,
            title: "Legg til en oppgave",
            description:
              "Bruk denne knappen når du har noe nytt å gjøre. Etter omvisningen kan du prøve å legge til en oppgave selv.",
          },
        ]}
      />
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 7,
  desc: "Du kan kontrollere åpen-tilstanden ved å bruke `showTour`- og `onShowTourChange`-props på Coach-komponenten. Dette er nyttig når du må åpne coachen programmatisk, eller triggeren for å starte omvisningen er utenfor Coach-komponenten.",
};
