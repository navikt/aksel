import { Search } from "@navikt/ds-react";
import { Header } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Header>
      <Header.Title as="h1">Sykepenger</Header.Title>
      <form
        className="self-center px-5"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Search!");
        }}
      >
        <Search
          label="header søk"
          size="small"
          variant="simple"
          placeholder="Søk"
        />
      </form>
      <Header.User name="Ola Normann" className="ml-auto" />
    </Header>
  );
};

export default withDsExample(Example, "full");

export const args = {
  index: 5,
};
