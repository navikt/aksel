import { Search, Spacer } from "@navikt/ds-react";
import { InternalHeader } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
      <form
        className="self-center px-5"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Search!");
        }}
      >
        <Search
          label="InternalHeader søk"
          size="small"
          variant="simple"
          placeholder="Søk"
        />
      </form>
      <Spacer />
      <InternalHeader.User name="Ola Normann" />
    </InternalHeader>
  );
};

export default withDsExample(Example, "full");

export const args = {
  index: 5,
};
