import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Listbox from "./Listbox";
import { RenderProps, useRenderProps } from "./renderprops";

const meta = {
  title: "Listbox",
} satisfies Meta<typeof Listbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [inputIsFocus, setInputIsFocus] = useState(false);
    return (
      <Listbox focusFirstOnKeydown={inputIsFocus}>
        <input
          type="text"
          onFocusCapture={() => setInputIsFocus(true)}
          onBlurCapture={() => setInputIsFocus(false)}
        />
        <Listbox.Option>option1</Listbox.Option>
        <Listbox.Option>option2</Listbox.Option>
        <Listbox.Option>option3</Listbox.Option>
        <Listbox.Option>option4</Listbox.Option>
        <Listbox.Option>option5</Listbox.Option>
        <Listbox.Option>option6</Listbox.Option>
      </Listbox>
    );
  },
};

type DemoProps = {
  options: any[];
  children: RenderProps<{ item: any }>["children"];
};

const WrapperComboboxItem = ({ item, childRender, ...rest }: any) => {
  const renderProps = useRenderProps({
    ...rest,
    children: childRender,
    defaultClassName: "custom-classname",
    values: {
      item,
    },
  });
  return <div data-item="wrapper">{renderProps.children}</div>;
};

const ComboboxPOC = ({ options, children }: DemoProps) => {
  const [inputIsFocus, setInputIsFocus] = useState(false);

  return (
    <div>
      <style>
        {`
            [aria-selected="true"] {
              color: red;
            }
          `}
      </style>
      <Listbox focusFirstOnKeydown={inputIsFocus}>
        <input
          type="text"
          onFocusCapture={() => setInputIsFocus(true)}
          onBlurCapture={() => setInputIsFocus(false)}
          data-isvirtualfocus={inputIsFocus}
        />
        {options.map((option, key) => (
          <WrapperComboboxItem key={key} item={option} childRender={children} />
        ))}
      </Listbox>
    </div>
  );
};

export const ComboboxSimpleDemo = {
  render: () => {
    return (
      <ComboboxPOC options={["option1", "option2", "option3"]}>
        {({ item }) => <Listbox.Option>{item}</Listbox.Option>}
      </ComboboxPOC>
    );
  },
};

/**
 * Bruker styrer selv hvordan de definerer label basert på input-value
 */
export const ComboboxLabelDemo = {
  render: () => {
    return (
      <ComboboxPOC
        options={[
          { key: "opt-1", label: "Option 1" },
          { key: "opt-2", label: "Option 2" },
          { key: "opt-3", label: "Option 3" },
        ]}
      >
        {({ item }) => <Listbox.Option>{item}</Listbox.Option>}
      </ComboboxPOC>
    );
  },
};

/**
 * Kan lage seksjoner/grupperinger basert på input-data
 */
export const ComboboxNestedDemo = {
  render: () => {
    return (
      <ComboboxPOC
        options={[
          {
            group: "Group 1",
            options: [
              { key: "opt-1", label: "Option 1" },
              { key: "opt-2", label: "Option 2" },
            ],
          },
          {
            group: "Group 2",
            options: [
              { key: "opt-3", label: "Option 3" },
              { key: "opt-4", label: "Option 4" },
              { key: "opt-5", label: "Option 5" },
            ],
          },
        ]}
      >
        {({ item }) => (
          <div>
            <h2>{item.group}</h2>
            {item.options.map((option: any) => (
              <Listbox.Option key={option}>{option.label}</Listbox.Option>
            ))}
          </div>
        )}
      </ComboboxPOC>
    );
  },
};
