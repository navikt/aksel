import { InformationSquareIcon } from "@navikt/aksel-icons";
import { InfoCard } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <InfoCard data-color="info">
      <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
        Fremhevet informasjon som ikke krever handling, often bare en kort
        melding som du ønsker å fremheve for brukeren.
      </InfoCard.Message>
    </InfoCard>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 6,
  desc: "For korte meldinger kan man velge å bruke InfoCard.Message. Dette er en enklere variant av InfoCard som kun inneholder en melding og et ikon. Denne skal ikke inneholde tittel eller knapper, men lenker er ok.",
};
