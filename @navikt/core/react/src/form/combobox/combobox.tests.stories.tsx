import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { UNSAFE_Combobox } from "./index";

export default {
  title: "ds-react/Combobox/Tests",
  component: UNSAFE_Combobox,
  decorators: [(story) => <div style={{ width: "300px" }}>{story()}</div>],
  parameters: {
    chromatic: { disable: false },
  },
  /* TODO: Temp disabled CI-tests */
  tags: ["!play-fn", "skip-test"],
} satisfies Meta<typeof UNSAFE_Combobox>;

type StoryObject = StoryObj<typeof UNSAFE_Combobox>;

const options = [
  "banana",
  "apple",
  "apple pie",
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const CancelInput: StoryObject = {
  render: () => {
    return (
      <UNSAFE_Combobox options={options} label="Hva er dine favorittfrukter?" />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Hva er dine favorittfrukter?");

    userEvent.click(input);
    await userEvent.type(input, "apple", { delay: 200 });
    await sleep(100);

    userEvent.keyboard("{ArrowDown}");
    await sleep(100);
    userEvent.keyboard("{Escape}");
    await sleep(100);
    userEvent.keyboard("{ArrowDown}");
    await sleep(50);
    const banana = canvas.getByText("banana");
    userEvent.click(banana);
  },
};

export const RemoveSelectedMultiSelect: StoryObject = {
  render: () => {
    return (
      <UNSAFE_Combobox
        options={options}
        label="Hva er dine favorittfrukter?"
        isMultiSelect
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Hva er dine favorittfrukter?");

    userEvent.click(input);
    await userEvent.type(input, "apple", { delay: 200 });
    await sleep(25);

    userEvent.keyboard("{ArrowDown}");
    await sleep(25);
    userEvent.keyboard("{Enter}");
    await sleep(25);
    userEvent.keyboard("{Escape}");
    await sleep(25);

    userEvent.click(input);
    await userEvent.type(input, "banana", { delay: 200 });
    await sleep(25);

    userEvent.keyboard("{ArrowDown}");
    await sleep(25);
    userEvent.keyboard("{Enter}");
    await sleep(25);

    const appleSlett = canvas.getByLabelText("apple slett");
    appleSlett.focus();
    await sleep(25);
    userEvent.click(appleSlett);
    await sleep(25);
    const appleOption = canvas.getByRole("option", {
      name: "apple",
      selected: false,
    });
    expect(appleOption).toBeVisible();
    userEvent.keyboard("{Escape}");
    await sleep(25);
    expect(appleOption).not.toBeVisible();

    const bananaSlett = canvas.getByLabelText("banana slett");
    expect(bananaSlett).toBeInTheDocument();
    const appleSlettAgain = canvas.queryByLabelText("apple slett");
    expect(appleSlettAgain).not.toBeInTheDocument();
  },
};

export const AllowNewValuesMultiSelect: StoryObject = {
  render: () => {
    return (
      <UNSAFE_Combobox
        isMultiSelect={true}
        options={options}
        label="Hva er dine favorittfrukter?"
        allowNewValues
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Hva er dine favorittfrukter?");

    userEvent.click(input);
    await userEvent.type(input, "aaa", { delay: 200 });
    await sleep(25);

    userEvent.keyboard("{ArrowDown}");
    await sleep(25);
    userEvent.keyboard("{Enter}");
    await sleep(25);

    const invalidSelect = canvas.queryByLabelText("aaa slett");
    expect(invalidSelect).toBeInTheDocument();
  },
};

export const AllowNewValuesSingleSelect: StoryObject = {
  render: () => {
    return (
      <UNSAFE_Combobox
        options={options}
        label="Hva er dine favorittfrukter?"
        allowNewValues
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Hva er dine favorittfrukter?");

    userEvent.click(input);
    await userEvent.type(input, "aaa", { delay: 200 });
    await sleep(25);
    expect(
      canvas.getByRole("option", { name: "Legg til “aaa”" }),
    ).toBeVisible();

    userEvent.keyboard("{ArrowDown}");
    await sleep(25);
    userEvent.keyboard("{Enter}");
    await sleep(25);

    const invalidSelect = canvas.queryByLabelText("aaa slett");
    expect(invalidSelect).not.toBeInTheDocument();
  },
};

export const DisallowNewValues: StoryObject = {
  render: () => {
    return (
      <UNSAFE_Combobox options={options} label="Hva er dine favorittfrukter?" />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Hva er dine favorittfrukter?");

    userEvent.click(input);
    await userEvent.type(input, "aaa", { delay: 200 });
    await sleep(25);

    userEvent.keyboard("{ArrowDown}");
    await sleep(25);
    userEvent.keyboard("{ArrowDown}");
    await sleep(25);
    userEvent.keyboard("{Enter}");
    await sleep(25);
    userEvent.keyboard("{Escape}");
    await sleep(25);

    const invalidSelect = canvas.queryByLabelText("aaa slett");
    expect(invalidSelect).not.toBeInTheDocument();
  },
};

export const CallbacksOnlyFireWhenExpected: StoryObj<{
  onChange: ReturnType<typeof fn>;
  onClear: ReturnType<typeof fn>;
  onToggleSelected: ReturnType<typeof fn>;
}> = {
  args: {
    onChange: fn(),
    onClear: fn(),
    onToggleSelected: fn(),
  },
  render: (props) => {
    return (
      <UNSAFE_Combobox
        options={options}
        label="Hva er dine favorittfrukter?"
        {...props}
      />
    );
  },
  play: async ({ canvasElement, args }) => {
    args.onToggleSelected.mockClear();
    args.onClear.mockClear();
    args.onChange.mockClear();
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Hva er dine favorittfrukter?");
    const searchWord = "tangerine";

    userEvent.click(input);
    await userEvent.type(input, searchWord, { delay: 200 });
    await sleep(25);
    userEvent.keyboard("{ArrowDown}");
    await sleep(25);
    userEvent.keyboard("{Enter}");
    await sleep(25);
    expect(args.onClear.mock.calls).toHaveLength(1);
    expect(args.onToggleSelected.mock.calls).toHaveLength(1);
    expect(args.onChange.mock.calls).toHaveLength(searchWord.length + 1);
  },
};

export const CorrectCasingWhenAutoCompleting = {
  args: {
    onChange: fn(),
    onClear: fn(),
    onToggleSelected: fn(),
  },
  render: (props) => {
    return (
      <UNSAFE_Combobox
        options={["Camel Case", "lowercase", "UPPERCASE"]}
        label="Liker du best store eller små bokstaver?"
        shouldAutocomplete
        allowNewValues
        {...props}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole<HTMLInputElement>("combobox");

    // With exisiting option
    userEvent.click(input);
    await userEvent.type(input, "cAmEl CaSe", { delay: 250 });
    await sleep(25);
    expect(input.value).toBe("cAmEl CaSe");
    await userEvent.type(input, "{Enter}");
    await sleep(25);
    const chips = canvas.getAllByRole("list")[0];
    const selectedUpperCaseChip = within(chips).getAllByRole("listitem")[0];
    expect(selectedUpperCaseChip).toHaveTextContent("Camel Case"); // A weird issue is preventing the accessible name from being used in the test, even if it works in VoiceOver

    // With custom option
    userEvent.click(input);
    await userEvent.type(input, "cAmEl{Backspace}", { delay: 250 });
    await sleep(25);
    expect(input.value).toBe("cAmEl");
    await userEvent.type(input, "{Enter}");
    await sleep(25);
    const selectedNewValueChip = within(chips).getAllByRole("listitem")[0];
    expect(selectedNewValueChip).toHaveTextContent("cAmEl"); // A weird issue is preventing the accessible name from being used in the test, even if it works in VoiceOver
  },
};

export const HoverAndFocusSwitching: StoryObject = {
  render: () => {
    return (
      <UNSAFE_Combobox options={options} label="Hva er dine favorittfrukter?" />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await sleep(50);

    const getInput = () =>
      canvas.getByRole("combobox", {
        name: "Hva er dine favorittfrukter?",
      });

    userEvent.click(getInput());
    expect(getInput().getAttribute("aria-expanded")).toEqual("false");
    expect(getInput().getAttribute("aria-activedescendant")).toBeNull();

    await sleep(25);
    userEvent.keyboard("{ArrowDown}");
    await sleep(25);
    const bananaOption = canvas.getByRole("option", { name: "banana" });
    expect(getInput().getAttribute("aria-activedescendant")).toBe(
      bananaOption.getAttribute("id"),
    );

    userEvent.keyboard("{ArrowDown}");
    await sleep(25);
    const appleOption = canvas.getByRole("option", { name: "apple" });
    expect(getInput().getAttribute("aria-activedescendant")).toBe(
      appleOption.getAttribute("id"),
    );

    userEvent.hover(bananaOption);
    await sleep(25);
    expect(getInput().getAttribute("aria-activedescendant")).toBe(
      bananaOption.getAttribute("id"),
    );
  },
};

export const EnterNotSubmittingForm: StoryObj<{
  onSubmit: ReturnType<typeof fn>;
}> = {
  args: {
    onSubmit: fn(),
  },
  render: ({ onSubmit }) => {
    return (
      <form action="https://www.aksel.nav.no" method="get" onSubmit={onSubmit}>
        <UNSAFE_Combobox
          options={options}
          label="Hva er dine favorittfrukter?"
          isMultiSelect
          allowNewValues
        />
      </form>
    );
  },
  play: async ({ canvasElement, args }) => {
    args.onSubmit.mockClear();
    const canvas = within(canvasElement);
    const waitTime = 0; // Change for debugging

    await sleep(waitTime);

    const getInput = () =>
      canvas.getByRole("combobox", {
        name: "Hva er dine favorittfrukter?",
      });

    const getOption = (name: string, selected: boolean) =>
      canvas.getByRole("option", { name, selected });
    await userEvent.click(getInput(), { delay: waitTime });

    await userEvent.keyboard("{ArrowDown}", { delay: waitTime });
    expect(getInput().getAttribute("aria-activedescendant")).toBe(
      getOption("banana", false).getAttribute("id"),
    );

    await userEvent.keyboard("{Enter}", { delay: waitTime });
    expect(args.onSubmit).not.toHaveBeenCalled();
    expect(getOption("banana", true)).toBeVisible();

    await userEvent.keyboard("{Shift>}{Tab}", { delay: waitTime });

    await userEvent.keyboard("{Enter}", { delay: waitTime });
    expect(args.onSubmit).not.toHaveBeenCalled();

    await userEvent.keyboard("test"); // Type option that does not exist
    await userEvent.keyboard("{Enter}", { delay: waitTime });
    expect(args.onSubmit).not.toHaveBeenCalled();

    await userEvent.keyboard("{ArrowDown}", { delay: waitTime }); // Select "test" custom option
    expect(
      canvas.getByRole("option", { name: "test", selected: true }),
    ).toBeVisible();
    await userEvent.keyboard("{Enter}", { delay: waitTime }); // De-select "test"
    expect(
      canvas.queryByRole("option", { name: "test", selected: false }),
    ).toBeNull();
    expect(args.onSubmit).not.toHaveBeenCalled();

    await userEvent.keyboard("{Escape}", { delay: waitTime }); // Clear input field
    await userEvent.keyboard("{Enter}", { delay: waitTime }); // Enter on empty Input with closed list
    expect(args.onSubmit).toHaveBeenCalledOnce();
  },
};
