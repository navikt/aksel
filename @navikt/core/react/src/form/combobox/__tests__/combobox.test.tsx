import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, test, vi } from "vitest";
import nb from "../../../util/i18n/locales/nb";
import { useId } from "../../../utils-external";
import { ComboboxProps, UNSAFE_Combobox } from "../index";

const options = [
  "apple",
  "apple pie",
  "banana",
  "grape",
  "grape fruit",
  "kiwi",
  "mango",
  "passion fruit",
  "pear",
  "pineapple",
  "strawberry",
  "tangerine",
  "watermelon",
];

const App = ({
  label = "Hva er dine favorittfrukter?",
  ...rest
}: Omit<ComboboxProps, "label"> & { label?: ComboboxProps["label"] }) => {
  const id = useId();
  return (
    <div data-theme="light">
      <UNSAFE_Combobox label={label} size="medium" id={id} {...rest} />
    </div>
  );
};

describe("Render combobox", () => {
  describe("with multi select", () => {
    test("Should be able to search, select and remove selections", async () => {
      render(<App isMultiSelect options={options} />);

      const input = screen.getByRole("combobox", {
        name: "Hva er dine favorittfrukter?",
      });
      await userEvent.click(input);
      await userEvent.type(input, "apple");
      await userEvent.click(
        await screen.findByRole("option", { name: "apple" }),
      );
      expect(
        await screen.findByRole("option", { name: "apple", selected: true }),
      ).toBeInTheDocument();
      await userEvent.click(
        await screen.findByRole("button", { name: "apple slett" }),
      );
    });
  });

  describe("Combobox state-handling", () => {
    test("Should show loading icon when loading (used for async search)", async () => {
      render(<App options={[]} isListOpen isLoading />);

      expect(await screen.findByText(nb.Combobox.loading)).toBeInTheDocument();
    });

    test("Should not select previous focused element when closes", async () => {
      render(<App options={options} />);

      const input = screen.getByRole("combobox", {
        name: "Hva er dine favorittfrukter?",
      });
      await userEvent.click(input);
      await userEvent.type(input, "ban");
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowUp}");
      await userEvent.keyboard("{Enter}");

      expect(screen.queryByRole("button", { name: "banana slett" })).toBeNull();
    });

    test("Should reset list when resetting input (ESC)", async () => {
      render(<App options={options} />);

      const input = screen.getByRole("combobox", {
        name: "Hva er dine favorittfrukter?",
      });
      await userEvent.click(input);
      await userEvent.type(input, "apple");
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Escape}");
      await userEvent.keyboard("{ArrowDown}");

      expect(
        await screen.findByRole("option", { name: "banana" }),
      ).toBeInTheDocument();
    });

    test("Should handle complex options with label and value", async () => {
      const onToggleSelected = vi.fn();
      render(
        <App
          options={[
            { label: "Hjelpemidler [HJE]", value: "HJE" },
            { label: "Oppfølging [OPP]", value: "OPP" },
            { label: "Sykepenger [SYK]", value: "SYK" },
            { label: "Sykemelding [SYM]", value: "SYM" },
          ]}
          onToggleSelected={onToggleSelected}
        />,
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
      const option = screen.getByRole("option", {
        name: "Hjelpemidler [HJE]",
        selected: false,
      });
      await userEvent.click(option);
      expect(onToggleSelected).toHaveBeenCalledWith("HJE", true, false);
      expect(
        screen.getByRole("option", {
          name: "Hjelpemidler [HJE]",
          selected: true,
        }),
      ).toBeInTheDocument();
    });

    test("should trigger onChange for every character typed or removed", async () => {
      const onChange = vi.fn();
      const onToggleSelected = vi.fn();
      render(
        <App
          options={["Apple", "Orange", "Banana", "Lemon"]}
          onChange={onChange}
          onToggleSelected={onToggleSelected}
          shouldAutocomplete
        />,
      );
      const combobox = screen.getByRole("combobox");
      expect(combobox).toBeInTheDocument();

      await userEvent.click(combobox);
      await userEvent.type(combobox, "Lemon");
      expect(onChange).toHaveBeenNthCalledWith(1, "L");
      expect(onChange).toHaveBeenNthCalledWith(2, "Le");
      expect(onChange).toHaveBeenNthCalledWith(3, "Lem");
      expect(onChange).toHaveBeenNthCalledWith(4, "Lemo");
      expect(onChange).toHaveBeenNthCalledWith(5, "Lemon");
    });

    test("should trigger onChange while typing and on accepting autocomplete suggestions", async () => {
      const onChange = vi.fn();
      const onToggleSelected = vi.fn();
      render(
        <App
          options={[
            "Hjelpemidler [HJE]",
            "Oppfølging [OPP]",
            "Sykepenger [SYK]",
            "Sykemelding [SYM]",
          ]}
          onChange={onChange}
          onToggleSelected={onToggleSelected}
          shouldAutocomplete
        />,
      );
      const combobox = screen.getByRole("combobox");
      expect(combobox).toBeInTheDocument();

      await userEvent.click(combobox);
      await userEvent.type(combobox, "Syke");
      await userEvent.keyboard("{ArrowRight}");
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Enter}");
      expect(onChange).toHaveBeenNthCalledWith(1, "S");
      expect(onChange).toHaveBeenNthCalledWith(2, "Sy");
      expect(onChange).toHaveBeenNthCalledWith(3, "Syk");
      expect(onChange).toHaveBeenNthCalledWith(4, "Syke");
      expect(onChange).toHaveBeenNthCalledWith(5, "Sykepenger [SYK]");
      expect(onChange).toHaveBeenCalledWith("");
      expect(onToggleSelected).toHaveBeenCalledExactlyOnceWith(
        "Sykepenger [SYK]",
        true,
        false,
      );
    });
  });

  describe("search", () => {
    test("should find matches anywhere in the label", async () => {
      render(<App options={options} />);

      const combobox = screen.getByRole("combobox", {
        name: "Hva er dine favorittfrukter?",
      });
      await userEvent.click(combobox);
      await userEvent.type(combobox, "p");

      const searchHits = [
        "apple",
        "apple pie",
        "pear",
        "grape",
        "passion fruit",
        "pineapple",
        "grape fruit",
      ];
      searchHits.forEach((label) => {
        expect(screen.getByRole("option", { name: label })).toBeInTheDocument();
      });
      screen.getAllByRole("option").forEach((option) => {
        expect(
          option.textContent && searchHits.includes(option.textContent),
        ).toBe(true);
      });
    });

    test("and pressing enter to select autocompleted word will select the correct word", async () => {
      const onToggleSelected = vi.fn();
      render(
        <App
          onToggleSelected={onToggleSelected}
          options={options}
          shouldAutocomplete
        />,
      );

      const combobox = screen.getByRole("combobox", {
        name: "Hva er dine favorittfrukter?",
      });
      await userEvent.click(combobox);
      await userEvent.type(combobox, "p");

      expect(combobox.getAttribute("value")).toBe("passion fruit");

      await userEvent.keyboard("{Enter}");

      expect(onToggleSelected).toHaveBeenCalledWith(
        "passion fruit",
        true,
        false,
      );
    });

    test("and pressing enter to select autocompleted word will select existing word when addNewOptions is true", async () => {
      const onToggleSelected = vi.fn();
      render(
        <App
          onToggleSelected={onToggleSelected}
          options={options.map((opt) => ({
            label: `${opt} (${opt})`,
            value: opt,
          }))}
          shouldAutocomplete
          allowNewValues
        />,
      );

      const combobox = screen.getByRole("combobox", {
        name: "Hva er dine favorittfrukter?",
      });
      await userEvent.click(combobox);
      await userEvent.type(combobox, "p");

      expect(combobox.getAttribute("value")).toBe(
        "passion fruit (passion fruit)",
      );

      await userEvent.keyboard("{Enter}");

      expect(onToggleSelected).toHaveBeenCalledWith(
        "passion fruit",
        true,
        false,
      );
    });
  });

  describe("has keyboard navigation", () => {
    test("for PageDown and PageUp", async () => {
      render(<App options={options} />);

      const combobox = screen.getByRole("combobox", {
        name: "Hva er dine favorittfrukter?",
      });

      const pressKey = async (key: string) => {
        await userEvent.keyboard(`{${key}}`);
      };

      const hasVirtualFocus = (option: string) =>
        expect(combobox.getAttribute("aria-activedescendant")).toBe(
          screen.getByRole("option", { name: option }).id,
        );

      await userEvent.click(combobox);

      await pressKey("ArrowDown");
      hasVirtualFocus("apple");
      await pressKey("PageDown");
      hasVirtualFocus("mango");
      await pressKey("PageDown");
      hasVirtualFocus("watermelon");
      await pressKey("PageUp");
      hasVirtualFocus("mango");
      await pressKey("PageUp");
      hasVirtualFocus("apple");
    });
  });
});
