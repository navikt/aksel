import React, { forwardRef } from "react";
import { Box } from "../../primitives/box";
import { VStack } from "../../primitives/stack";
import { Label } from "../../typography";
import type { AutoCompleteOption, OptionGroup } from "./AutoSuggest.types";

interface AutoSuggestProps {
  options: OptionGroup<AutoCompleteOption>[];
  onSelect: (value: string) => void;
  className?: string;
}

const AutoSuggest = forwardRef<HTMLDivElement, AutoSuggestProps>(
  ({ options, onSelect }, ref) => {
    return (
      <Box ref={ref} padding="space-6">
        {options.map((group) => (
          <div key={group.label}>
            <Label as="div">{group.label}</Label>
            <VStack gap="space-4">
              {group.options.map((option) => {
                return (
                  <div key={option.value}>
                    <button
                      type="button"
                      onClick={() =>
                        /* @ts-expect-error TODO: We need to convert the data properly */
                        onSelect(option.value ?? option.propertyKey)
                      }
                    >
                      <span>
                        {/* @ts-expect-error TODO: We need to convert the data properly */}
                        {option.value ?? option.label ?? option.propertyLabel}
                      </span>
                      {option.description && <span>{option.description}</span>}
                      {option.tags && option.tags.length > 0 && (
                        <div>
                          {option.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </VStack>
          </div>
        ))}
      </Box>
    );
  },
);

export { AutoSuggest };
