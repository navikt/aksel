import { Dispatch } from "react";
import { Search } from "@navikt/ds-react";

const SearchField = ({
  onSearch,
}: {
  onSearch: Dispatch<
    React.SetStateAction<{ query: string; tokenType: "css" | "js" }>
  >;
}) => {
  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch({
          query: (event.target[0] as HTMLInputElement).value,
          tokenType: "css",
        });
      }}
    >
      <Search label="Søk etter token" hideLabel />
    </form>
  );
};

export default SearchField;
