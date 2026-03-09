import React, { forwardRef, useState } from "react";
import { Search } from "../../form/search";
import { VStack } from "../../primitives/stack";
import { Detail, Label } from "../../typography";
import Listbox from "../../utils/components/Listbox/root/ListboxRoot";
import { DismissableLayer } from "../../utils/components/dismissablelayer/DismissableLayer";
import { Floating } from "../../utils/components/floating/Floating";
import { useMergeRefsN } from "../../utils/hooks";
import type { AutoCompleteOption, OptionGroup } from "./AutoSuggest.types";

interface AutoSuggestProps {
  options: OptionGroup<AutoCompleteOption>[];
  onSelect: (option: AutoCompleteOption) => boolean;
  className?: string;
  value: string;
  onChange: (newValue: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AutoSuggest = forwardRef<HTMLInputElement, AutoSuggestProps>(
  ({ options, onSelect, value, onChange, open, setOpen }, ref) => {
    const [virtuallyFocusedOptionId, setVirtuallyFocusedOptionId] =
      useState("");

    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

    /* Unsure why N version works, but not regular here */
    const mergedRef = useMergeRefsN([setInputRef, ref]);

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (newValue: string) => {
      onChange(newValue);
      setOpen(true);
    };

    const handleSelectOption = (option: AutoCompleteOption) => {
      const createdNewToken = onSelect(option);

      if (createdNewToken) {
        inputRef?.focus();
        setOpen(false);
      }
    };

    return (
      <Floating>
        <Listbox setVirtuallyFocusedOptionId={setVirtuallyFocusedOptionId}>
          <Floating.Anchor>
            <Listbox.InputSlot>
              <Search
                label="Tabellsøk"
                variant="simple"
                className="aksel-property-filter__input"
                placeholder="Type to filter..."
                ref={mergedRef}
                value={value}
                onChange={handleChange}
                onClick={() => {
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                /* onKeyDown={(e) => {
              if (e.key === "Enter") {
                createToken(filterText);
              }
            }} */
              />
            </Listbox.InputSlot>
          </Floating.Anchor>
          {open && (
            <AutoSuggestPopup
              options={options}
              onSelect={handleSelectOption}
              focusedValue={virtuallyFocusedOptionId}
              setFocusedValue={setVirtuallyFocusedOptionId}
              onClose={handleClose}
              safeZoneAnchor={inputRef}
            />
          )}
        </Listbox>
      </Floating>
    );
  },
);

type AutoSuggestPopupProps = {
  options: OptionGroup<AutoCompleteOption>[];
  onSelect: (option: AutoCompleteOption) => void;
  focusedValue: string;
  setFocusedValue: (value: string) => void;
  onClose: () => void;
  safeZoneAnchor: HTMLInputElement | null;
};

const AutoSuggestPopup = forwardRef<HTMLDivElement, AutoSuggestPopupProps>(
  (
    {
      options,
      onSelect,
      focusedValue,
      setFocusedValue,
      onClose,
      safeZoneAnchor,
    },
    ref,
  ) => {
    return (
      <DismissableLayer
        asChild
        onDismiss={onClose}
        safeZone={{ anchor: safeZoneAnchor }}
      >
        <Floating.Content
          ref={ref}
          align="start"
          side="bottom"
          fallbackPlacements={[]}
          sideOffset={8}
          className="aksel-property-filter__popup"
        >
          <div className="aksel-property-filter__popup-inner">
            <Listbox.Options setVirtuallyFocusedOptionId={setFocusedValue}>
              {options.map((group) => (
                <Listbox.Group key={group.label} label={group.label}>
                  {group.options.map((item) => (
                    <Listbox.Option
                      key={item.value}
                      id={item.value}
                      onClick={() => onSelect(item)}
                      hasVirtualFocus={focusedValue === item.value}
                    >
                      <VStack gap="space-0">
                        <Label as="div">{item.label}</Label>
                        {item.description && (
                          <Detail as="div">{item.description}</Detail>
                        )}
                      </VStack>
                      {/* {item.tags && item.tags.length > 0 && (
                        <div>
                          {item.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      )} */}
                    </Listbox.Option>
                  ))}
                </Listbox.Group>
              ))}
            </Listbox.Options>
          </div>
        </Floating.Content>
      </DismissableLayer>
    );
  },
);

export { AutoSuggest };
