import React from "react";
import { BodyShort, Button, ProgressBar } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const starWarsQuotes = [
  "May the force be with you",
  "I find your lack of faith disturbing",
  "It's a trap",
  "Do or do not, there is no try",
  "I am your father",
  "The force will be with you, always",
  "I've got a bad feeling about this",
  "I love you.",
  "I know.",
  "I am a Jedi, like my father before me",
  "Never tell me the odds",
  "Search your feelings, you know it to be true",
];

const Example = () => {
  const [value, setValue] = React.useState(3);
  return (
    <div>
      <div>
        <ProgressBar value={value} valueMax={12} aria-label="interactive" />

        <BodyShort style={{ margin: "3rem 0", textAlign: "center" }}>
          {starWarsQuotes[value]}
        </BodyShort>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          onClick={() =>
            setValue((oldValue) => (oldValue === 0 ? 0 : oldValue - 1))
          }
        >
          Forrige sitat
        </Button>
        <Button
          onClick={() =>
            setValue((oldValue) => (oldValue === 12 ? 12 : oldValue + 1))
          }
        >
          Neste sitat
        </Button>
      </div>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
