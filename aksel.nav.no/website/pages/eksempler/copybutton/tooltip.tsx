import { FilesIcon } from "@navikt/aksel-icons";
import { CopyButton, Tooltip } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Tooltip content="Kopier fødselsnummer">
      <CopyButton copyText="12003045000" icon={<FilesIcon aria-hidden />} />
    </Tooltip>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 8,
  desc: "Tooltip kan hjelpe med å gi mer kontekst om hva man kopierer. Vi har testet dette med skjermleser og funnet ut at statisk tekst som 'kopier ...' fungerer bedre enn dynamisk tekst ved klikk i tooltip.",
};
