import type { Meta, StoryFn } from "@storybook/react-vite";
import React, { useCallback, useMemo, useState } from "react";
import { Search } from "../../../form/search";
import { Box } from "../../../primitives/box";
import { BodyShort } from "../../../typography";
import { useDeferredValue } from "../../hooks/useDeferredValue";
import { HighlightText } from "../HighlightText/HighlightText";
import { DismissableLayer } from "../dismissablelayer/DismissableLayer";
import { Floating } from "../floating/Floating";
import { Listbox } from "./root/ListboxRoot";

const meta: Meta<typeof Listbox> = {
  title: "utilities/Listbox",
  component: Listbox,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type MyOption = {
  label: string;
  value: `opt-${number}`;
  metadata?: string;
};

const nordicCountries: MyOption[] = [
  { label: "Norge", value: "opt-1", metadata: "foo1" },
  { label: "Finland", value: "opt-2" },
  { label: "Sverige", value: "opt-3", metadata: "foo3" },
  { label: "Danmark", value: "opt-4" },
  { label: "Island", value: "opt-5" },
  { label: "Grønland", value: "opt-6" },
  { label: "Færøyene", value: "opt-7" },
  { label: "Åland", value: "opt-8" },
];
const centralEuropeanCountries: MyOption[] = [
  { label: "Tyskland", value: "opt-9" },
  { label: "Østerrike", value: "opt-10" },
  { label: "Sveits", value: "opt-11" },
  { label: "Liechtenstein", value: "opt-12" },
  { label: "Polen", value: "opt-13" },
  { label: "Tsjekkia", value: "opt-14" },
  { label: "Slovakia", value: "opt-15" },
  { label: "Ungarn", value: "opt-16" },
  { label: "Slovenia", value: "opt-17" },
];
const countries: MyOption[] = [...nordicCountries, ...centralEuropeanCountries];

type MyGroup = {
  label: string;
  id: `group-${number}`;
  options: MyOption[];
};

const groupedCountries: (MyGroup | MyOption)[] = [
  {
    label: "Norden",
    id: "group-1",
    options: nordicCountries,
  },
  {
    label: "Sentral-Europa",
    id: "group-2",
    options: centralEuropeanCountries,
  },
  { label: "Annet (ikke gruppert)", value: "opt-01" },
];

interface RenderOptionsProps {
  options: (MyGroup | MyOption)[];
  selectedOptions: MyOption["value"][];
  filterString: string;
  virtuallyFocusedOptionId: string;
  onSelect: (option: MyOption) => void;
}
const RenderOptions = ({
  options,
  selectedOptions,
  filterString,
  virtuallyFocusedOptionId,
  onSelect,
}: RenderOptionsProps) =>
  options.map((optionOrGroup) =>
    "options" in optionOrGroup ? (
      <Listbox.Group key={optionOrGroup.label} label={optionOrGroup.label}>
        {optionOrGroup.options.map((option) => (
          <Listbox.Option
            key={option.value}
            id={option.value}
            onClick={() => onSelect(option)}
            aria-selected={selectedOptions.includes(option.value)}
            hasVirtualFocus={virtuallyFocusedOptionId === option.value}
          >
            <HighlightText text={filterString}>{option.label}</HighlightText>
            {selectedOptions.includes(option.value) && <Checkmark />}
          </Listbox.Option>
        ))}
      </Listbox.Group>
    ) : (
      <Listbox.Option
        key={optionOrGroup.value}
        id={optionOrGroup.value}
        onClick={() => onSelect(optionOrGroup)}
        aria-selected={selectedOptions.includes(optionOrGroup.value)}
        hasVirtualFocus={virtuallyFocusedOptionId === optionOrGroup.value}
      >
        <HighlightText text={filterString}>{optionOrGroup.label}</HighlightText>
        {selectedOptions.includes(optionOrGroup.value) && <Checkmark />}
      </Listbox.Option>
    ),
  );
const Checkmark = () => <div style={{ float: "right" }}>✓</div>;

export const Default = () => {
  const [filterString, setFilterString] = useState("");
  const [selectedOption, setSelectedOption] = useState<
    MyOption["value"] | null
  >(null);
  const [virtuallyFocusedOptionId, setVirtuallyFocusedOptionId] = useState("");

  const filteredOptions = filterString
    ? filterOptions(groupedCountries, filterString)
    : groupedCountries;

  const onSelect = (option: MyOption) => {
    setSelectedOption(option.value);
    console.log(option);
  };

  return (
    <>
      <div>Selected: {selectedOption}</div>

      <Listbox setVirtuallyFocusedOptionId={setVirtuallyFocusedOptionId}>
        <Listbox.InputSlot virtuallyFocusedOptionId={virtuallyFocusedOptionId}>
          <Search
            label="Velg noe"
            hideLabel={false}
            variant="simple"
            value={filterString}
            onChange={setFilterString}
          />
        </Listbox.InputSlot>

        <Listbox.Options>
          <RenderOptions
            options={filteredOptions}
            selectedOptions={selectedOption ? [selectedOption] : []}
            filterString={filterString}
            virtuallyFocusedOptionId={virtuallyFocusedOptionId}
            onSelect={onSelect}
          />
        </Listbox.Options>
      </Listbox>
    </>
  );
};

interface OptimizedProps {
  count: number;
  highlight: boolean;
}
export const Optimized: StoryFn<OptimizedProps> = ({ count, highlight }) => {
  const [filterString, setFilterString] = useState("");
  const deferredFilterString = useDeferredValue(filterString);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [virtuallyFocusedOptionId, setVirtuallyFocusedOptionId] = useState("");

  const allOptions = useMemo(
    () =>
      Array.from(
        { length: count },
        (_, i) => `Option ${String(i + 1).padStart(4, "0")}`,
      ),
    [count],
  );

  const filterStringLowerCase = deferredFilterString.toLocaleLowerCase();

  const filteredOptions = deferredFilterString
    ? allOptions.filter((option) =>
        option.toLocaleLowerCase().includes(filterStringLowerCase),
      )
    : allOptions;

  return (
    <>
      <div>Selected: {selectedOption}</div>

      <Listbox setVirtuallyFocusedOptionId={setVirtuallyFocusedOptionId}>
        <Listbox.InputSlot virtuallyFocusedOptionId={virtuallyFocusedOptionId}>
          <Search
            label="Velg noe"
            hideLabel={false}
            variant="simple"
            value={filterString}
            onChange={setFilterString}
          />
        </Listbox.InputSlot>

        <Box asChild borderWidth="1" maxHeight="300px">
          <Listbox.Options>
            {filteredOptions.map((option) => (
              <MyMemoizedOption
                key={option}
                value={option}
                filterString={highlight ? deferredFilterString : ""}
                isSelected={selectedOption === option}
                hasVirtualFocus={virtuallyFocusedOptionId === option}
                onSelect={setSelectedOption}
              />
            ))}
          </Listbox.Options>
        </Box>
      </Listbox>
    </>
  );
};
Optimized.args = {
  count: 1000,
  highlight: false,
};
Optimized.parameters = {
  a11y: { disable: true },
  docs: { disable: true },
};
interface MyMemoizedOptionProps {
  value: string;
  filterString: string;
  isSelected: boolean;
  hasVirtualFocus: boolean;
  onSelect: (value: string) => void;
}
const MyMemoizedOption = React.memo(
  ({
    value,
    filterString,
    isSelected,
    hasVirtualFocus,
    onSelect,
  }: MyMemoizedOptionProps) => {
    //console.log(Date.now(), "Rendering option", value); // eslint-disable-line react-hooks/purity
    return (
      <Listbox.Option
        key={value}
        id={value}
        onClick={useCallback(() => onSelect(value), [onSelect, value])}
        aria-selected={isSelected}
        hasVirtualFocus={hasVirtualFocus}
      >
        <HighlightText text={filterString}>{value}</HighlightText>
        {isSelected && <Checkmark />}
      </Listbox.Option>
    );
  },
);

export const WithFloating = () => {
  const [filterString, setFilterString] = useState("");
  const [selectedOption, setSelectedOption] = useState<
    MyOption["value"] | null
  >(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [virtuallyFocusedOptionId, setVirtuallyFocusedOptionId] = useState("");
  const [open, setOpen] = useState(false);

  const filteredOptions = filterString
    ? filterOptions(groupedCountries, filterString)
    : groupedCountries;

  const onSelect = (option: MyOption) => {
    setSelectedOption(option.value);
    //setOpen(false);
    console.log(option);
  };

  return (
    <Floating>
      <div>Selected: {selectedOption}</div>

      <Listbox setVirtuallyFocusedOptionId={setVirtuallyFocusedOptionId}>
        <Floating.Anchor>
          <Listbox.InputSlot
            virtuallyFocusedOptionId={virtuallyFocusedOptionId}
          >
            <Search
              label="Velg noe"
              hideLabel={false}
              variant="simple"
              ref={inputRef}
              value={filterString}
              onChange={setFilterString}
              onClick={() => setOpen(true)}
              onFocus={() => setOpen(true)}
            />
          </Listbox.InputSlot>
        </Floating.Anchor>
        {open && (
          <DismissableLayer
            asChild
            onDismiss={() => setOpen(false)}
            safeZone={{ anchor: inputRef.current }}
          >
            <Floating.Content
              align="start"
              side="bottom"
              fallbackPlacements={[]}
              sideOffset={4}
            >
              <Box
                asChild
                background="default"
                borderWidth="1"
                maxHeight="calc(var(--__axc-floating-available-height) - 4px)"
                width="var(--__axc-floating-anchor-width)"
              >
                <Listbox.Options>
                  <RenderOptions
                    options={filteredOptions}
                    selectedOptions={selectedOption ? [selectedOption] : []}
                    filterString={filterString}
                    virtuallyFocusedOptionId={virtuallyFocusedOptionId}
                    onSelect={onSelect}
                  />
                </Listbox.Options>
              </Box>
            </Floating.Content>
          </DismissableLayer>
        )}
      </Listbox>
    </Floating>
  );
};

export const UseCaseTeamkatalogen = () => {
  const [filterString, setFilterString] = useState("");
  const [selectedOption, setSelectedOption] = useState<
    MyOption["value"] | null
  >(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [virtuallyFocusedOptionId, setVirtuallyFocusedOptionId] = useState("");
  const [open, setOpen] = useState(false);

  const filteredOptions =
    filterString.length > 2 ? filterOptions(countries, filterString) : null;

  const onSelect = (option: MyOption) => {
    setSelectedOption(option.value);
    close();
    console.log(option);
  };

  function close() {
    setVirtuallyFocusedOptionId("");
    setFilterString("");
    setOpen(false);
  }

  return (
    <div style={{ maxWidth: "500px" }}>
      <Floating>
        <BodyShort spacing>
          Søkefelt der resultatene vises som alternativer i en listbox. Omtrent
          som dagens Combobox, men der valg fører til navigering og ikke huskes
          (i feltet).
        </BodyShort>

        <BodyShort spacing>Valgt: {selectedOption}</BodyShort>

        <Listbox setVirtuallyFocusedOptionId={setVirtuallyFocusedOptionId}>
          <Floating.Anchor>
            <Listbox.InputSlot
              virtuallyFocusedOptionId={virtuallyFocusedOptionId}
            >
              <Search
                label="Søk etter team, seksjon, person eller tagg"
                placeholder="Søk etter team, seksjon, person eller tagg"
                variant="simple"
                ref={inputRef}
                value={filterString}
                onChange={(newValue) => {
                  setFilterString(newValue);
                  if (!open && newValue.length > 2) {
                    setOpen(true);
                  }
                }}
                onClear={close}
                onClick={() => setOpen(true)}
                onFocus={() => setOpen(true)}
              />
            </Listbox.InputSlot>
          </Floating.Anchor>
          {open && (
            <DismissableLayer
              asChild
              onDismiss={close}
              safeZone={{ anchor: inputRef.current }}
            >
              <Floating.Content
                align="start"
                side="bottom"
                fallbackPlacements={[]}
                sideOffset={4}
              >
                <Box
                  background="default"
                  borderWidth="1"
                  maxHeight="calc(var(--__axc-floating-available-height) - 4px)"
                  width="var(--__axc-floating-anchor-width)"
                >
                  {filteredOptions && filteredOptions.length > 0 && (
                    <Listbox.Options>
                      <RenderOptions
                        options={filteredOptions}
                        selectedOptions={[]}
                        filterString={filterString}
                        virtuallyFocusedOptionId={virtuallyFocusedOptionId}
                        onSelect={onSelect}
                      />
                    </Listbox.Options>
                  )}
                  {filteredOptions && filteredOptions.length === 0 && (
                    <Box padding="space-20" role="status">
                      Ingen resultater
                    </Box>
                  )}
                  {!filteredOptions && (
                    <Box padding="space-20">Skriv minst 3 tegn for å søke</Box>
                  )}
                </Box>
              </Floating.Content>
            </DismissableLayer>
          )}
        </Listbox>
      </Floating>
    </div>
  );
};

type Option = {
  label: string;
  value: string;
};

type Group<T extends Option> = {
  label: string;
  id: string;
  options: T[];
};

function filterOptions<T extends (Option | Group<Option>)[]>(
  options: T,
  filterString: string,
): T {
  const filterStringLowerCase = filterString.toLocaleLowerCase();

  return options
    .map((optionOrGroup) => {
      if ("options" in optionOrGroup) {
        const matchingOptions = optionOrGroup.options.filter((option) =>
          option.label.toLocaleLowerCase().includes(filterStringLowerCase),
        );
        if (matchingOptions.length > 0) {
          return { ...optionOrGroup, options: matchingOptions };
        }
        return null;
      }
      if (
        optionOrGroup.label.toLocaleLowerCase().includes(filterStringLowerCase)
      ) {
        return optionOrGroup;
      }
      return null;
    })
    .filter((option) => option !== null) as T;
}
