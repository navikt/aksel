import React, { type JSX, forwardRef, useCallback, useState } from "react";
import { CheckmarkIcon } from "@navikt/aksel-icons";
import { Search } from "../../form/search";
import { HStack, VStack } from "../../primitives/stack";
import { BodyShort, Detail } from "../../typography";
import { useId } from "../../utils-external";
import { Listbox } from "../../utils/components/Listbox/root/ListboxRoot";
import { DismissableLayer } from "../../utils/components/dismissablelayer/DismissableLayer";
import { Floating } from "../../utils/components/floating/Floating";
import { useMergeRefsN } from "../../utils/hooks";
import type { AutoCompleteOption, OptionGroup } from "./AutoSuggest.types";

interface AutoSuggestProps {
  options: OptionGroup<AutoCompleteOption>[];
  onSelect: (option: AutoCompleteOption) => boolean;
  value: string;
  onChange: (newValue: string) => void;
  /**
   * The part of `value` the options were filtered by, highlighted in each option.
   */
  highlightText: string;
  /**
   * Called when the user submits the raw input text (Enter without an active option).
   */
  onSubmit: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AutoSuggest = forwardRef<HTMLInputElement, AutoSuggestProps>(
  (
    {
      options,
      onSelect,
      value,
      onChange,
      highlightText,
      onSubmit,
      open,
      setOpen,
    },
    ref,
  ) => {
    const [virtuallyFocusedOptionId, setVirtuallyFocusedOptionId] =
      useState("");

    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

    const listboxId = `aksel-token-filter-listbox-${useId()}`;

    /* Unsure why N version works, but not regular here */
    const mergedRef = useMergeRefsN([setInputRef, ref]);

    const handleClose = useCallback(() => {
      setOpen(false);
      setVirtuallyFocusedOptionId("");
    }, [setOpen]);

    const handleChange = (newValue: string) => {
      onChange(newValue);
      /* Options are regenerated on every keystroke, so the previous option no longer exists */
      setVirtuallyFocusedOptionId("");
      setOpen(true);
    };

    const handleSelectOption = useCallback(
      (option: AutoCompleteOption) => {
        const createdNewToken = onSelect(option);

        /* Keep real focus on the input, the listbox only ever has virtual focus */
        inputRef?.focus();

        /* Multi-select options keep their id while toggling, so virtual focus can stay */
        if (!option.multiSelect) {
          setVirtuallyFocusedOptionId("");
        }

        if (createdNewToken) {
          setOpen(false);
        }
      },
      [onSelect, inputRef, setOpen],
    );

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
                onKeyDown={(event) => {
                  if (event.key === "Escape" && open) {
                    /*
                     * Search clears the input on Escape. When the popup is open,
                     * Escape should only close the popup.
                     */
                    event.stopPropagation();
                    handleClose();
                    return;
                  }

                  if (event.key === "Enter") {
                    /* Never submit a surrounding form */
                    event.preventDefault();

                    /* Listbox handles Enter when an option has virtual focus */
                    if (!virtuallyFocusedOptionId) {
                      onSubmit(value);
                    }
                  }
                }}
                size="small"
                autoComplete="off"
                aria-expanded={open}
                aria-controls={listboxId}
                aria-autocomplete="list"
              />
            </Listbox.InputSlot>
          </Floating.Anchor>
          {open && (
            <AutoSuggestPopup
              id={listboxId}
              options={options}
              onSelect={handleSelectOption}
              focusedValue={virtuallyFocusedOptionId}
              onClose={handleClose}
              safeZoneAnchor={inputRef}
              autoSuggestValue={highlightText}
            />
          )}
        </Listbox>
      </Floating>
    );
  },
);

type AutoSuggestPopupProps = {
  id: string;
  options: OptionGroup<AutoCompleteOption>[];
  onSelect: (option: AutoCompleteOption) => void;
  focusedValue: string;
  onClose: () => void;
  safeZoneAnchor: HTMLInputElement | null;
  autoSuggestValue: string;
};

const AutoSuggestPopup = forwardRef<HTMLDivElement, AutoSuggestPopupProps>(
  (
    {
      id,
      options,
      onSelect,
      focusedValue,
      onClose,
      safeZoneAnchor,
      autoSuggestValue,
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
          <Listbox.Options
            id={id}
            className="aksel-property-filter__popup-inner"
            aria-multiselectable={options.some((group) =>
              group.options.some((item) => item.multiSelect),
            )}
            /* Options are only virtually focused, so real focus must stay on the input */
            onMouseDown={(event) => event.preventDefault()}
          >
            {options.map((group) => {
              /* Property- and value-groups can share a label, so include an option to keep keys unique */
              const groupKey = `${group.label}-${group.options[0]?.value ?? ""}`;

              const groupOptions = group.options.map((item) => (
                <AutoSuggestOption
                  key={item.value}
                  item={item}
                  onSelect={onSelect}
                  hasVirtualFocus={focusedValue === item.value}
                  autoSuggestValue={autoSuggestValue}
                />
              ));

              /* Groups without a label are rendered as plain options */
              if (!group.label) {
                return (
                  <React.Fragment key={groupKey}>{groupOptions}</React.Fragment>
                );
              }

              return (
                <Listbox.Group key={groupKey} label={group.label}>
                  {groupOptions}
                </Listbox.Group>
              );
            })}
          </Listbox.Options>
        </Floating.Content>
      </DismissableLayer>
    );
  },
);

type AutoSuggestOptionProps = {
  item: AutoCompleteOption;
  onSelect: AutoSuggestPopupProps["onSelect"];
  hasVirtualFocus: boolean;
  autoSuggestValue: string;
};

const AutoSuggestOption = React.memo(
  ({
    item,
    onSelect,
    hasVirtualFocus,
    autoSuggestValue,
  }: AutoSuggestOptionProps) => {
    return (
      <Listbox.Option
        id={item.value}
        onClick={() => onSelect(item)}
        hasVirtualFocus={hasVirtualFocus}
        aria-selected={item.multiSelect?.selected ?? false} // TODO: Consider different role that doesn't require aria-selected
      >
        <HStack align="center" gap="space-8" wrap={false}>
          {item.multiSelect && (
            <span className="aksel-property-filter__checkbox" aria-hidden>
              {item.multiSelect.selected && (
                <CheckmarkIcon fontSize="0.875rem" />
              )}
            </span>
          )}
          <VStack gap="space-4" className="aksel-property-filter__option">
            <HStack
              align="center"
              justify="space-between"
              gap="space-8"
              wrap={false}
            >
              <BodyShort as="div" size="small">
                {item.freeText ? (
                  /* TODO: i18n */
                  `Use: "${item.label}"`
                ) : (
                  <HighlightText
                    text={item.label}
                    highlightText={autoSuggestValue}
                  />
                )}
              </BodyShort>
              {item.description && <Detail as="div">{item.description}</Detail>}
            </HStack>
            {item.tags && item.tags.length > 0 && (
              <HStack gap="space-4">
                {item.tags.map((tag, index, tags) => (
                  <Detail key={tag} as="div" textColor="subtle">
                    {`${tag}${index < tags.length - 1 ? "," : ""}`}
                  </Detail>
                ))}
              </HStack>
            )}
          </VStack>
        </HStack>
      </Listbox.Option>
    );
  },
);

function HighlightText({
  text,
  highlightText,
}: {
  text: string;
  highlightText: string;
}) {
  if (!text || !highlightText) {
    return <span>{text}</span>;
  }

  if (text === highlightText) {
    return <Highlight text={text} />;
  }

  const { noMatches, matches } = highlightSplit(text, highlightText);

  const highlighted: (string | JSX.Element)[] = [];
  let matchOffset = 0;

  noMatches.forEach((noMatch, idx) => {
    highlighted.push(<span key={`noMatch-${matchOffset}`}>{noMatch}</span>);
    matchOffset += noMatch.length;

    if (matches && idx < matches.length) {
      highlighted.push(
        <Highlight key={`match-${matchOffset}`} text={matches[idx]} />,
      );
      matchOffset += matches[idx].length;
    }
  });

  return <span>{highlighted}</span>;
}

function Highlight({ text }: { text: string }) {
  return <mark className="aksel-property-filter__highlight">{text}</mark>;
}

function highlightSplit(text: string, highlightText: string) {
  /* Skip loooong texts */
  if (highlightText.length > 1000) {
    return { noMatches: [text], matches: null };
  }

  /* Case insensitive filtering */
  const filteringPattern = highlightText.replace(
    /[-[\]/{}()*+?.\\^$|]/g,
    "\\$&",
  );
  const regexp = new RegExp(filteringPattern, "gi");
  const noMatches = text.split(regexp);
  const matches = text.match(regexp);

  return { noMatches, matches };
}

export { AutoSuggest };
