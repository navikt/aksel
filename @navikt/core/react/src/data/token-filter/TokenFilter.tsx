import React, { forwardRef, useState } from "react";
import { Popover } from "../../popover";
import { cl } from "../../utils/helpers";

export type QueryFilterOperator =
  | "<"
  | "<="
  | ">"
  | ">="
  | ":"
  | "!:"
  | "="
  | "!="
  | "^"
  | "!^"
  | (string & {});

type QueryFilterOperation = "and" | "or";

type QueryFilterToken = {
  propertyKey: string;
  operator: QueryFilterOperator;
  value: any;
};

type QueryFilterQuery = {
  tokens: QueryFilterToken[];
  operation: QueryFilterOperation;
};

type QueryFilteringOptions = {
  propertyKey: string;
  value: any;
}[];

type QueryFilteringProperty = {
  key: string;
  propertyLabel: string;
};

type QueryFilteringProperties = QueryFilteringProperty[];

type TokenFilterProps = {
  query: QueryFilterQuery;
  onChange: (newQuery: QueryFilterQuery) => void;
  className?: string;
  filteringOptions: QueryFilteringOptions;
  filteringProperties: QueryFilteringProperties;
};

export const TokenFilter = forwardRef<HTMLDivElement, TokenFilterProps>(
  ({ query, onChange, className, filteringProperties }, ref) => {
    const [inputAnchor, setInputAnchor] =
      React.useState<HTMLInputElement | null>(null);

    const [filterText, setFilterText] = useState<string>("");

    /* const { internalQuery } = derrivedTokenState(
      filteringProperties,
      filteringOptions,
      query,
    ); */

    const { properties } = derrivedFilterState(filteringProperties);

    const parsedText = parseText(filterText, properties);

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
        <pre>{JSON.stringify({ parsedText }, null, 2)}</pre>
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

type ParsedText =
  | {
      step: "property";
      property: QueryFilteringProperty;
      operator: QueryFilterOperator;
      value: string;
    }
  | {
      step: "operator";
      property: QueryFilteringProperty;
      operatorPrefix: string;
    }
  | { step: "free-text"; operator?: QueryFilterOperator; value: string };

const parseText = (
  filteringText: string,
  filteringProperties: QueryFilteringProperties,
): ParsedText => {
  const property = matchFilteringProperty(filteringProperties, filteringText);
  console.info({ property });
  if (!property) {
    return {
      step: "free-text",
      value: filteringText,
    };
  }

  const allowedOperations = getAllowedOperators();

  const textWithoutProperty = filteringText.substring(
    property.propertyLabel.length,
  );

  const operator = matchOperator(
    allowedOperations,
    textWithoutProperty.trimStart(),
  );

  if (operator) {
    return {
      step: "property",
      property,
      operator,
      value: removeOperator(textWithoutProperty, operator),
    };
  }

  const operatorPrefix = matchOperatorPrefix(
    allowedOperations,
    textWithoutProperty.trimStart(),
  );

  if (operatorPrefix !== null) {
    return { step: "operator", property, operatorPrefix };
  }

  return {
    step: "free-text",
    value: filteringText,
  };
};

function removeOperator(source: string, operator: string) {
  const operatorLastIndex = source.indexOf(operator) + operator.length;
  const textWithoutOperator = source.slice(operatorLastIndex);

  return textWithoutOperator.trimStart();
}

function matchFilteringProperty(
  filteringProperties: QueryFilteringProperties,
  text: string,
) {
  const sortedProperties = [...filteringProperties].sort(
    (a, b) => b.propertyLabel.length - a.propertyLabel.length,
  );
  return sortedProperties.find((prop) =>
    text.toLowerCase().startsWith(prop.propertyLabel.toLowerCase()),
  );
}

function matchOperatorPrefix(
  allowedOperators: QueryFilterOperator[],
  filteringText: string,
): string | null {
  if (filteringText.trim().length === 0) {
    return "";
  }

  for (const operator of allowedOperators) {
    if (operator.toLowerCase().startsWith(filteringText.toLowerCase())) {
      return filteringText;
    }
  }

  return null;
}

function matchOperator(allowedOperators: QueryFilterOperator[], text: string) {
  const sortedOperators = [...allowedOperators].sort(
    (a, b) => b.length - a.length,
  );

  return sortedOperators.find((prop) =>
    text.toLowerCase().startsWith(prop.toLowerCase()),
  );
}

function getAllowedOperators(): QueryFilterOperator[] {
  const operatorOrder = ["=", "!=", ":", "!:", "^", "!^", ">=", "<=", "<", ">"];

  return operatorOrder;
}
