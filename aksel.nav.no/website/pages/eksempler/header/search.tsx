import { InternalHeader, Search, Spacer } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
      <form
        className="self-center px-5"
        onSubmit={(e) => {
          e.preventDefault();
          console.info("Search!");
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

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "full" });

export const args = {
  index: 5,
  title: "Søk",
};
