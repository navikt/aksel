import { Search, ToggleGroup } from "@navikt/ds-react";

interface IconSearchFormProps {
  searchState: {
    query: string;
    toggle: "stroke" | "fill";
  };
  setSearchState: React.Dispatch<
    React.SetStateAction<{
      query: string;
      toggle: "stroke" | "fill";
    }>
  >;
}

function IconPageForm({ searchState, setSearchState }: IconSearchFormProps) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-fit items-center gap-6 sm:flex-nowrap"
    >
      <Search
        variant="simple"
        label="Ikonsøk"
        placeholder="Søk"
        autoComplete="off"
        onChange={(query) =>
          setSearchState((prev) => ({
            ...prev,
            query,
          }))
        }
        value={searchState.query}
        clearButton={false}
        onKeyDown={(e) => {
          /* Avoids closing icon-sidebar when clearing Search */
          /* TODO: Check if still needed */
          if (e.key === "Escape") {
            if (e.currentTarget.value) {
              e.stopPropagation();
            }
          }
        }}
      />
      <ToggleGroup
        value={searchState.toggle}
        onChange={(v) =>
          setSearchState((prev) => ({
            ...prev,
            toggle: v as (typeof searchState)["toggle"],
          }))
        }
        variant="neutral"
        aria-label="Velg ikonvariant"
        className="shrink-0"
      >
        <ToggleGroup.Item value="stroke" label="Stroke" />
        <ToggleGroup.Item value="fill" label="Fill" />
      </ToggleGroup>
    </form>
  );
}

export { IconPageForm };
