import { VStack } from "@navikt/ds-react";

export default function Example() {
  const lorem =
    "Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til barnebidrag fra en eller begge foreldre mens du fullfører videregående skole eller tilsvarende.";

  return <VStack gap="4">{lorem}</VStack>;
}

export const args = {
  index: 1,
  title: "Med søk",
  desc: "abc",
};
