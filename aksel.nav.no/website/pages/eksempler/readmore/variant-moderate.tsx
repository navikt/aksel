import { ReadMore, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16" align="center">
      <ReadMore
        variant="moderate"
        header="Dette regnes som helsemessige begrensninger"
        size="large"
      >
        Med helsemessige begrensninger mener vi funksjonshemming, sykdom,
        allergier som hindrer deg i arbeidet eller andre årsaker som må tas
        hensyn til når du skal finne nytt arbeid. Du må oppgi hva som gjelder
        for deg, og dokumentere de helsemessige årsakene du viser til.
      </ReadMore>
      <ReadMore
        variant="moderate"
        header="Dette regnes som helsemessige begrensninger"
        size="medium"
      >
        Med helsemessige begrensninger mener vi funksjonshemming, sykdom,
        allergier som hindrer deg i arbeidet eller andre årsaker som må tas
        hensyn til når du skal finne nytt arbeid. Du må oppgi hva som gjelder
        for deg, og dokumentere de helsemessige årsakene du viser til.
      </ReadMore>
      <ReadMore
        variant="moderate"
        header="Dette regnes som helsemessige begrensninger"
        size="small"
      >
        Med helsemessige begrensninger mener vi funksjonshemming, sykdom,
        allergier som hindrer deg i arbeidet eller andre årsaker som må tas
        hensyn til når du skal finne nytt arbeid. Du må oppgi hva som gjelder
        for deg, og dokumentere de helsemessige årsakene du viser til.
      </ReadMore>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
