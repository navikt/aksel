import React, { type JSX, forwardRef, useCallback, useState } from "react";
import { Search } from "../../form/search";
import { VStack } from "../../primitives/stack";
import { BodyShort, Detail } from "../../typography";
import { useId } from "../../utils-external";
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
    const listboxId = useId();

    /* Unsure why N version works, but not regular here */
    const mergedRef = useMergeRefsN([setInputRef, ref]);

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (newValue: string) => {
      onChange(newValue);
      setOpen(true);
    };

    const handleSelectOption = useCallback(
      (_e, option: AutoCompleteOption) => {
        const createdNewToken = onSelect(option);

        if (createdNewToken) {
          inputRef?.focus();
          setOpen(false);
        }
      },
      [onSelect, inputRef, setOpen],
    );

    return (
      <Floating>
        <Listbox setVirtuallyFocusedOptionId={setVirtuallyFocusedOptionId}>
          <Floating.Anchor>
            <Listbox.InputSlot listboxId={listboxId}>
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
                size="small"
                autoComplete="off"
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
              listboxId={listboxId}
              options={options}
              onSelect={handleSelectOption}
              focusedValue={virtuallyFocusedOptionId}
              setFocusedValue={setVirtuallyFocusedOptionId}
              onClose={handleClose}
              safeZoneAnchor={inputRef}
              autoSuggestValue={value}
            />
          )}
        </Listbox>
      </Floating>
    );
  },
);

type AutoSuggestPopupProps = {
  listboxId: string;
  options: OptionGroup<AutoCompleteOption>[];
  onSelect: (
    event: React.MouseEvent<HTMLDivElement>,
    option: AutoCompleteOption,
  ) => void;
  focusedValue: string;
  setFocusedValue: (value: string) => void;
  onClose: () => void;
  safeZoneAnchor: HTMLInputElement | null;
  autoSuggestValue: string;
};

const AutoSuggestPopup = forwardRef<HTMLDivElement, AutoSuggestPopupProps>(
  (
    {
      listboxId,
      options,
      onSelect,
      focusedValue,
      setFocusedValue,
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
          <div className="aksel-property-filter__popup-inner">
            <Listbox.Options setVirtuallyFocusedOptionId={setFocusedValue}>
              {options.map((group) => (
                <Listbox.Group key={group.label} label={group.label}>
                  {group.options.map((item) => (
                    <AutoSuggestOption
                      key={item.value}
                      item={item}
                      listboxId={listboxId}
                      onSelect={onSelect}
                      hasVirtualFocus={focusedValue === item.value}
                      autoSuggestValue={autoSuggestValue}
                    />
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

type AutoSuggestOptionProps = {
  item: AutoCompleteOption;
  listboxId: string;
  onSelect: AutoSuggestPopupProps["onSelect"];
  hasVirtualFocus: boolean;
  autoSuggestValue: string;
};

const AutoSuggestOption = React.memo(
  ({
    item,
    listboxId,
    onSelect,
    hasVirtualFocus,
    autoSuggestValue,
  }: AutoSuggestOptionProps) => (
    <Listbox.Option
      id={item.value}
      onClick={onSelect}
      onClickParam={item}
      hasVirtualFocus={hasVirtualFocus}
      listboxId={listboxId}
    >
      <VStack gap="space-0">
        <BodyShort as="div" size="small">
          <HighlightText text={item.label} highlightText={autoSuggestValue} />
        </BodyShort>
        {item.description && <Detail as="div">{item.description}</Detail>}
      </VStack>
      {/* {item.tags && item.tags.length > 0 && (
        <div>
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )} */}
    </Listbox.Option>
  ),
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

  noMatches.forEach((noMatch, idx) => {
    highlighted.push(<span key={`noMatch-${idx}`}>{noMatch}</span>);

    if (matches && idx < matches.length) {
      highlighted.push(<Highlight key={`match-${idx}`} text={matches[idx]} />);
    }
  });

  return <span>{highlighted}</span>;
}

function Highlight({ text }: { text: string }) {
  return <mark className="aksel-listbox__highlight">{text}</mark>;
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
