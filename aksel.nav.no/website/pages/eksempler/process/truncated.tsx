import { BodyShort, Process } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Process isTruncated="both">
      <Process.Event title="02. Jan. 2020. klokken 10:21">
        Din utbetalingsplan har blitt oppdatert, les vedtaket for mer
        informasjon
      </Process.Event>
      <Process.Event title="27. Des. 2019. klokken 14:48">
        <BodyShort>Livsopphold, Husleie er ferdig behandlet</BodyShort>
        <BodyShort textColor="subtle" size="small">
          Et brev fra veileder følger med denne hendelsen
        </BodyShort>
      </Process.Event>
      <Process.Event title="21. Des. 2019. klokken 16:52">
        Du har sendt 10 vedlegg til NAV
      </Process.Event>
    </Process>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "`isTruncated` styrer hvor linjen som kobler hendelsene vises. Dette brukes for å illustrere at prosessen har flere hendelser før/etter enn det som vises.",
};
