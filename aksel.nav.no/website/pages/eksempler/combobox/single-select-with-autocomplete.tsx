import { withDsExample } from "@/web/examples/withDsExample";
import { UNSAFE_Combobox } from "@navikt/ds-react";

const Example = () => {
  return (
    <div>
      <UNSAFE_Combobox
        label="Hva er den aller kuleste Star Wars-filmen noensinne, helt objektivt?"
        options={initialOptions}
        shouldAutocomplete={true}
      />
    </div>
  );
};

const initialOptions = [
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
export default withDsExample(Example, { variant: "static" });

export const args = {
  index: 0,
  desc: "Ved Single Select velger brukeren ett valg fra listen. Med autocomplete foreslås et valg fra listen som matcher det brukeren skriver.",
};
