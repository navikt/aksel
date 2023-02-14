import { BodyLong, Heading, Popover, Select } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useState } from "react";

const Example = () => {
  const [anchor, setAnchor] = useState<HTMLSelectElement>(null);

  const [placement, setPlacement] = useState<typeof options[number]>(
    options[0]
  );

  return (
    <div className="py-32">
      <Select
        ref={setAnchor}
        label="Velg placement"
        onChange={(e) => setPlacement(e.target.value as typeof options[number])}
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
          <BodyLong style={{ maxWidth: 300 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt sit,
            repudiandae tempore fuga minima.
          </BodyLong>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
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

export const args = {
  index: 2,
};
