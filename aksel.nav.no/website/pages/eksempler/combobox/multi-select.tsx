import { UNSAFE_Combobox } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <UNSAFE_Combobox
        label="Hva er de kuleste transportmidlene?"
        options={initialOptions}
        isMultiSelect
      />
    </div>
  );
};

const initialOptions = [
  "car",
  "bus",
  "train",
  "skateboard",
  "bicycle",
  "motorcycle",
  "boat",
  "airplane",
  "helicopter",
  "truck",
  "van",
  "scooter",
];

export default withDsExample(Example, { variant: "static" });

export const args = {
  index: 1,
  desc: "Ved Multi Select kan brukeren velge flere valg fra listen.",
};
