import React, { forwardRef, useState } from "react";
import { Popover } from "../../popover";
import { cl } from "../../utils/helpers";
import type {
  QueryFilterQuery,
  QueryFilteringOptions,
  QueryFilteringProperties,
} from "./TokenFilter.types";
import { parseQueryText } from "./helpers/parse-query-text";

type TokenFilterProps = {
  query: QueryFilterQuery;
  onChange: (newQuery: QueryFilterQuery) => void;
  className?: string;
  filteringOptions: QueryFilteringOptions;
  filteringProperties: QueryFilteringProperties;
};

export const TokenFilter = forwardRef<HTMLDivElement, TokenFilterProps>(
  ({ query, className, filteringProperties }, ref) => {
    const [inputAnchor, setInputAnchor] = useState<HTMLInputElement | null>(
      null,
    );

    const [filterText, setFilterText] = useState<string>("");
    const { properties } = derrivedFilterState(filteringProperties);

    const queryState = parseQueryText(filterText, properties);

    return (
      <div
        ref={ref}
        className={cl("aksel-property-filter", className)}
        role="search"
      >
        <input
          type="text"
          className="aksel-property-filter__input"
          placeholder="Type to filter..."
          ref={setInputAnchor}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Popover
          anchorEl={inputAnchor}
          open={filterText.length > 0}
          onClose={() => setFilterText("")}
        >
          123
        </Popover>
        {query.tokens.map((token, index) => {
          return (
            <div key={index} className="aksel-property-filter__token">
              <strong>{token.propertyKey}</strong> {token.operator}{" "}
            </div>
          );
        })}
        <ul>
          {filteringProperties.map((prop) => (
            <li key={prop.key}>{prop.propertyLabel}</li>
          ))}
        </ul>
        <pre>{JSON.stringify(queryState, null, 2)}</pre>
      </div>
    );
  },
);

function derrivedFilterState(
  filteringProperties: QueryFilteringProperties,
  /* filteringOptions: QueryFilteringOptions, query: QueryFilterQuery */
) {
  return { properties: filteringProperties };
}
