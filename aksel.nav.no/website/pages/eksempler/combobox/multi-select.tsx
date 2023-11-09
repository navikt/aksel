import { withDsExample } from "@/web/examples/withDsExample";
import { UNSAFE_Combobox } from "@navikt/ds-react";

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

export const Example = () => {
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

export default withDsExample(Example, { variant: "static" });

export const args = {
  index: 1,
  desc: "Ved Multi Select kan brukeren velge flere valg fra listen.",
};
