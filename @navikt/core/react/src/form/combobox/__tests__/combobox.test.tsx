/* eslint-disable testing-library/no-unnecessary-act -- https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useId } from "react";
import { describe, expect, test, vi } from "vitest";
import { UNSAFE_Combobox } from "../index";

const options = [
  "banana",
  "apple",
  "tangerine",
  "pear",
  "grape",
  "kiwi",
  "mango",
  "passion fruit",
  "pineapple",
  "strawberry",
  "watermelon",
  "grape fruit",
];

const App = (props) => {
  const id = useId();
  return (
    <div data-theme="light">
      <UNSAFE_Combobox
        label="Hva er dine favorittfrukter?"
        size="medium"
        variant="simple"
        id={id}
        {...props}
      />
    </div>
  );
};

describe("Render combobox", () => {
  describe("with multi select", () => {
    test("Should be able to search, select and remove selections", async () => {
      render(<App isMultiSelect options={options} />);

      await act(async () => {
        await userEvent.click(
          screen.getByRole("combobox", {
            name: "Hva er dine favorittfrukter?",
          }),
        );
      });
      await act(async () => {
        await userEvent.type(
          screen.getByRole("combobox", {
            name: "Hva er dine favorittfrukter?",
          }),
          "apple",
        );
      });
      await act(async () => {
        await userEvent.click(
          await screen.findByRole("option", { name: "apple" }),
        );
      });
      expect(
        await screen.findByRole("option", { name: "apple", selected: true }),
      ).toBeInTheDocument();
      await act(async () => {
        await userEvent.click(
          await screen.findByRole("button", { name: "apple slett" }),
        );
      });
    });
  });

  test("Should show loading icon when loading (used for async search)", async () => {
    render(<App options={[]} isListOpen isLoading />);

    expect(await screen.findByText("Søker...")).toBeInTheDocument();
  });
});

describe("Combobox state-handling", () => {
  test("Should not select previous focused element when closes", async () => {
    render(<App options={options} />);

    await act(async () => {
      await userEvent.click(
        screen.getByRole("combobox", { name: "Hva er dine favorittfrukter?" }),
      );
    });
    await act(async () => {
      await userEvent.type(
        screen.getByRole("combobox", { name: "Hva er dine favorittfrukter?" }),
        "ban",
      );
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowUp}");
      await userEvent.keyboard("{Enter}");
    });

    expect(screen.queryByRole("button", { name: "banana slett" })).toBeNull();
  });

  test("Should reset list when resetting input (ESC)", async () => {
    render(<App options={options} />);

    await act(async () => {
      await userEvent.click(
        screen.getByRole("combobox", { name: "Hva er dine favorittfrukter?" }),
      );
    });
    await act(async () => {
      await userEvent.type(
        screen.getByRole("combobox", { name: "Hva er dine favorittfrukter?" }),
        "apple",
      );
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Escape}");
      await userEvent.keyboard("{ArrowDown}");
    });

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
    const bananaOption = screen.getByRole("option", {
      name: "Hjelpemidler [HJE]",
      selected: false,
    });
    await act(async () => {
      await userEvent.click(bananaOption);
    });
    expect(onToggleSelected).toHaveBeenCalledWith("HJE", true, false);
    expect(
      screen.getByRole("option", {
        name: "Hjelpemidler [HJE]",
        selected: true,
      }),
    ).toBeInTheDocument();
  });
});
