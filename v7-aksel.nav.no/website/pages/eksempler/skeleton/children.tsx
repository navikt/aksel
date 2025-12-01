import { Button, Skeleton, TextField } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Skeleton variant="rounded">
      <TextField label="E-post" />
      <Button>Send inn</Button>
    </Skeleton>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = { render: Example };

export const args = {
  index: 3,
  desc: "Bruk av `children` med flere elementer vil gi en grå blokk som ofte ikke ligner på det faktiske innholdet. Derfor anbefaler vi å manuelt bygge elementet ved hjelp av flere skeletons og `height` + `width`.",
};
