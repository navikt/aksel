import { useState } from "react";
import { BodyLong, Heading, Popover, Select } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [anchor, setAnchor] = useState<HTMLSelectElement>(null);
  const [placement, setPlacement] = useState<Option>(options[0]);

  return (
    <div className="py-32">
      <Select
        ref={setAnchor}
        label="Velg 'placement'"
        onChange={(e) => setPlacement(e.target.value as Option)}
      >
        {options.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </Select>
      <Popover
        open
        onClose={() => null}
        anchorEl={anchor}
        placement={placement}
      >
        <Popover.Content>
          <Heading level="2" size="xsmall" spacing>
            Lorem, ipsum dolor sit amet.
          </Heading>
          <BodyLong style={{ maxWidth: 250 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt sit,
            repudiandae tempore fuga.
          </BodyLong>
        </Popover.Content>
      </Popover>
    </div>
  );
};

const options = [
  "top",
  "bottom",
  "right",
  "left",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end",
] as const;

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

type Option = (typeof options)[number];

export const args = {
  index: 3,
  desc: "Her kan du teste ulike 'placement'-verdier. Legg merke til at Popover overstyrer valget hvis hvis det ikke er plass i den retningen.",
};
