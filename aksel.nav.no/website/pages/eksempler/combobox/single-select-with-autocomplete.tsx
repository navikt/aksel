import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <UNSAFE_Combobox
      label="Hva er den aller kuleste Star Wars-filmen noensinne, helt objektivt?"
      options={options}
      shouldAutocomplete
    />
  );
};

const options = [
  "A New Hope",
  "The Empire Strikes Back",
  "Return of the Jedi",
  "The Phantom Menace",
  "Attack of the Clones",
  "Revenge of the Sith",
  "The Force Awakens",
  "Rogue One",
  "The Last Jedi",
  "Solo",
  "The Rise of Skywalker",
];

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "static",
  minHeight: "300px",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Med `shouldAutocomplete` foreslås et valg fra listen som matcher det brukeren skriver.",
};
