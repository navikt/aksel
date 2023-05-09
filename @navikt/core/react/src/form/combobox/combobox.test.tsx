/* eslint-disable react/jsx-pascal-case */
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useId, useState } from "react";
import { Combobox } from "..";
import { act } from "react-dom/test-utils";

const OriginalOptions = [
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

const App = () => {
  const [options] = useState(OriginalOptions);
  const id = useId();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  return (
    <div data-theme="light">
      <Combobox
        options={options}
        label="Hva er dine favorittfrukter?"
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        /* everything under here is optional? */
        size="medium"
        variant="simple"
        id={id}
      />
    </div>
  );
};

describe("Render combobox", () => {
  it("Should be able to search, select and remove selections", async () => {
    const utils = render(<App />);

    await userEvent.click(
      utils.getByRole("combobox", { name: "Hva er dine favorittfrukter?" })
    );
    await act(async () => {
      await userEvent.type(
        utils.getByRole("combobox", { name: "Hva er dine favorittfrukter?" }),
        "apple"
      );
    });
    await act(async () => {
      fireEvent.click(await utils.findByRole("option", { name: "apple" }));
    });
    expect(
      await utils.findByRole("option", { name: "apple", selected: true })
    ).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(
        await utils.findByRole("button", { name: "apple slett" })
      );
    });
  });
});
