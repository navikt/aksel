import { BodyLong, Box } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box
      background="surface-default"
      padding="6"
      borderRadius="xlarge"
      borderColor="border-subtle"
      borderWidth="1"
    >
      <BodyLong spacing>
        Hvis du er helt eller delvis arbeidsledig eller permittert, kan du ha
        rett til pengestøtte fra Nav.
      </BodyLong>
      <BodyLong spacing>
        Nav kan også gi deg råd og veiledning i situasjonen din.
      </BodyLong>
      <BodyLong spacing>
        Hvis du ikke får dagpenger kan du ha rett til tiltakspenger. Dette er en
        dagsats du får de dagene du deltar på et arbeidsmarkedstiltak. Et
        arbeidsmarkedstiltak kan for eksempel være kurs, jobbklubb eller
        arbeidstrening.
      </BodyLong>
    </Box>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  background: "subtle",
  legacyOnly: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 9,
  desc: "Box erstatter den avviklede komponenten Panel.",
};
