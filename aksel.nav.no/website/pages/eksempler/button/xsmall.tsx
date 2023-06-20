import { PencilIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="xsmall" variant="primary" icon={<PencilIcon aria-hidden />}>
        Primary
      </Button>
      <Button size="xsmall" variant="secondary">
        Secondary
      </Button>
      <Button size="xsmall" variant="tertiary">
        Tertiary
      </Button>
      <Button size="xsmall" variant="danger">
        Danger
      </Button>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Varianten xsmall er tilgjengelig for bruk i tabell eller interne løsninger. Bør brukes sparsomt om mulig da klikkflaten kan være problematisk, spesielt på mobil.",
};
