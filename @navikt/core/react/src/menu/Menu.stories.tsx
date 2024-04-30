import React from "react";
import { Menu } from "./Menu";

export default {
  title: "Utilities/Menu",
  excludeStories: ["TickIcon", "classes"],
  decorators: [
    (Story) => (
      <div>
        {storyStyles}
        <Story />
      </div>
    ),
  ],
};

export const Styled = () => (
  <MenuWithAnchor>
    <Menu.Item className="item" onSelect={() => window.alert("undo")}>
      Undo
    </Menu.Item>
    <Menu.Item className="item" onSelect={() => window.alert("redo")}>
      Redo
    </Menu.Item>
    <Menu.Separator className="separator" />
    <Menu.Item className="item" disabled onSelect={() => window.alert("cut")}>
      Cut
    </Menu.Item>
    <Menu.Item className="item" onSelect={() => window.alert("copy")}>
      Copy
    </Menu.Item>
    <Menu.Item className="item" onSelect={() => window.alert("paste")}>
      Paste
    </Menu.Item>
  </MenuWithAnchor>
);

export const Submenus = () => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  return (
    <MenuWithAnchor>
      <Menu.Item className="item" onSelect={() => window.alert("undo")}>
        Undo
      </Menu.Item>
      <Submenu open={open1} onOpenChange={setOpen1}>
        <Menu.Item className="item" disabled>
          Disabled
        </Menu.Item>
        <Menu.Item className="item" onSelect={() => window.alert("one")}>
          One
        </Menu.Item>
        <Submenu open={open2} onOpenChange={setOpen2}>
          <Menu.Item className="item" onSelect={() => window.alert("one")}>
            One
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("two")}>
            Two
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("three")}>
            Three
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("four")}>
            Four
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("five")}>
            Five
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("six")}>
            Six
          </Menu.Item>
        </Submenu>
        <Submenu heading="Sub Menu" open={open3} onOpenChange={setOpen3}>
          <Menu.Item className="item" onSelect={() => window.alert("one")}>
            One
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("two")}>
            Two
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("three")}>
            Three
          </Menu.Item>
        </Submenu>
        <Menu.Item className="item" onSelect={() => window.alert("two")}>
          Two
        </Menu.Item>
        <Submenu open={open4} onOpenChange={setOpen4} disabled>
          <Menu.Item className="item" onSelect={() => window.alert("one")}>
            One
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("two")}>
            Two
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("three")}>
            Three
          </Menu.Item>
        </Submenu>
        <Menu.Item className="item" onSelect={() => window.alert("three")}>
          Three
        </Menu.Item>
      </Submenu>

      <Menu.Separator className="separator" />
      <Menu.Item className="item" disabled onSelect={() => window.alert("cut")}>
        Cut
      </Menu.Item>
      <Menu.Item className="item" onSelect={() => window.alert("copy")}>
        Copy
      </Menu.Item>
      <Menu.Item className="item" onSelect={() => window.alert("paste")}>
        Paste
      </Menu.Item>
    </MenuWithAnchor>
  );
};

const foodGroups: {
  label?: string;
  foods: { value: string; label: string; disabled?: boolean }[];
}[] = [
  {
    label: "Fruits",
    foods: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "blueberry", label: "Blueberry" },
      { value: "grapes", label: "Grapes" },
      { value: "pineapple", label: "Pineapple" },
    ],
  },
  {
    label: "Vegetables",
    foods: [
      { value: "aubergine", label: "Aubergine" },
      { value: "broccoli", label: "Broccoli" },
      { value: "carrot", label: "Carrot", disabled: true },
      { value: "courgette", label: "Courgette" },
      { value: "leek", label: "Leek" },
    ],
  },
  {
    label: "Meat",
    foods: [
      { value: "beef", label: "Beef" },
      { value: "beef-with-sauce", label: "Beef with sauce" },
      { value: "chicken", label: "Chicken" },
      { value: "lamb", label: "Lamb" },
      { value: "pork", label: "Pork" },
    ],
  },
  {
    foods: [
      { value: "candies", label: "Candies" },
      { value: "chocolates", label: "Chocolates" },
    ],
  },
];

export const WithLabels = () => (
  <MenuWithAnchor>
    {foodGroups.map((foodGroup, index) => (
      <Menu.Group key={index}>
        {foodGroup.label && (
          <Menu.Label className="label" key={foodGroup.label}>
            {foodGroup.label}
          </Menu.Label>
        )}
        {foodGroup.foods.map((food) => (
          <Menu.Item
            key={food.value}
            className="item"
            disabled={food.disabled}
            onSelect={() => window.alert(food.label)}
          >
            {food.label}
          </Menu.Item>
        ))}
        {index < foodGroups.length - 1 && (
          <Menu.Separator className="separator" />
        )}
      </Menu.Group>
    ))}
  </MenuWithAnchor>
);

export const CheckboxItems = () => {
  const options = ["Crows", "Ravens", "Magpies", "Jackdaws"];

  const [selection, setSelection] = React.useState<string[]>([]);

  const handleSelectAll = () => {
    setSelection((currentSelection) =>
      currentSelection.length === options.length ? [] : options,
    );
  };

  return (
    <MenuWithAnchor>
      <Menu.CheckboxItem
        className="item"
        checked={
          selection.length === options.length
            ? true
            : selection.length
              ? "indeterminate"
              : false
        }
        onCheckedChange={handleSelectAll}
      >
        Select all
        {selection.length === options.length ? <TickIcon /> : "—"}
      </Menu.CheckboxItem>
      <Menu.Separator className="separator" />
      {options.map((option) => (
        <Menu.CheckboxItem
          key={option}
          className="item"
          checked={selection.includes(option)}
          onCheckedChange={() =>
            setSelection((current) =>
              current.includes(option)
                ? current.filter((el) => el !== option)
                : current.concat(option),
            )
          }
        >
          {option}
          <TickIcon />
        </Menu.CheckboxItem>
      ))}
    </MenuWithAnchor>
  );
};

export const RadioItems = () => {
  const files = ["README.md", "index.js", "page.css"];
  const [file, setFile] = React.useState(files[1]);

  return (
    <MenuWithAnchor>
      <Menu.Item className="item" onSelect={() => window.alert("minimize")}>
        Minimize window
      </Menu.Item>
      <Menu.Item className="item" onSelect={() => window.alert("zoom")}>
        Zoom
      </Menu.Item>
      <Menu.Item className="item" onSelect={() => window.alert("smaller")}>
        Smaller
      </Menu.Item>
      <Menu.Separator className="separator" />
      <Menu.RadioGroup value={file} onValueChange={setFile}>
        {files.map((_file) => (
          <Menu.RadioItem key={_file} className="item" value={_file}>
            {_file}
            <TickIcon />
          </Menu.RadioItem>
        ))}
      </Menu.RadioGroup>
    </MenuWithAnchor>
  );
};

export const Animated = () => {
  const files = ["README.md", "index.js", "page.css"];
  const [file, setFile] = React.useState(files[1]);
  const [open, setOpen] = React.useState(true);
  const checkboxItems = [
    { label: "Bold", state: React.useState(false) },
    { label: "Italic", state: React.useState(true) },
    { label: "Underline", state: React.useState(false) },
    { label: "Strikethrough", state: React.useState(false), disabled: true },
  ];

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={open}
          onChange={(event) => setOpen(event.target.checked)}
        />{" "}
        open
      </label>
      <br />
      <br />
      <MenuWithAnchor className="contentAnimated content" open={open}>
        {checkboxItems.map(
          ({ label, state: [checked, setChecked], disabled }) => (
            <Menu.CheckboxItem
              key={label}
              className="item"
              checked={checked}
              onCheckedChange={setChecked}
              disabled={disabled}
            >
              {label}
              <TickIcon />
            </Menu.CheckboxItem>
          ),
        )}
        <Menu.RadioGroup value={file} onValueChange={setFile}>
          {files.map((_file) => (
            <Menu.RadioItem key={_file} className="item" value={_file}>
              {_file}
              <TickIcon />
            </Menu.RadioItem>
          ))}
        </Menu.RadioGroup>
      </MenuWithAnchor>
    </>
  );
};

type MenuProps = Omit<
  React.ComponentProps<typeof Menu> & React.ComponentProps<typeof Menu.Content>,
  | "trapFocus"
  | "onCloseAutoFocus"
  | "disableOutsidePointerEvents"
  | "disableOutsideScroll"
>;

const MenuWithAnchor: React.FC<MenuProps> = (props) => {
  const { open = true, children, ...contentProps } = props;
  return (
    <Menu open={open} onOpenChange={() => {}} modal={false}>
      {/* inline-block allows anchor to move when rtl changes on document */}
      <Menu.Anchor style={{ display: "inline-block" }} />
      <Menu.Portal>
        <Menu.Content
          className="content"
          onCloseAutoFocus={(event) => event.preventDefault()}
          align="start"
          {...contentProps}
        >
          {children}
        </Menu.Content>
      </Menu.Portal>
    </Menu>
  );
};

const Submenu: React.FC<
  MenuProps & { animated?: boolean; disabled?: boolean; heading?: string }
> = (props) => {
  const {
    heading = "Submenu",
    open = true,
    onOpenChange,
    children,
    animated = false,
    disabled,
    ...contentProps
  } = props;
  return (
    <Menu.Sub open={open} onOpenChange={onOpenChange}>
      <Menu.SubTrigger className="subTrigger" disabled={disabled}>
        {heading} →
      </Menu.SubTrigger>
      <Menu.Portal>
        <Menu.SubContent
          className={animated ? "contentAnimated content" : "content"}
          {...contentProps}
        >
          {children}
        </Menu.SubContent>
      </Menu.Portal>
    </Menu.Sub>
  );
};

export const TestMenu: React.FC<MenuProps> = () => {
  const props = { open: true };
  return (
    <Menu open={props.open} onOpenChange={() => {}} modal={true}>
      <Menu.Anchor asChild>
        <button>Menu</button>
      </Menu.Anchor>
      <Menu.Portal>
        <Menu.Content
          className="content"
          onCloseAutoFocus={(event) => event.preventDefault()}
          align="start"
        >
          <Menu.Item className="item" onSelect={() => window.alert("Undo")}>
            Undo
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("Add")}>
            Add
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("Save")}>
            Save
          </Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu>
  );
};

const itemCss = `
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  cursor: default;
  user-select: none;
  white-space: nowrap;
  height: 25px;
  padding: 0 10px;
  color: black;
  border-radius: 3px;
`;

const storyStyles = (
  <style>{`

    *:focus{
      color: red !important;
    }

    .content {
      display: inline-block;
      box-sizing: border-box;
      min-width: 130px;
      background-color: white;
      border: 1px solid gray;
      border-radius: 6px;
      padding: 5px;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
      font-size: 13px;

      &:focus-within {
        borderColor: black;
      }
    }

    .label {
      ${itemCss}
      color: gray;
    }

    .item {
      ${itemCss}
      outline: none;

      &[data-highlighted] {
        backgroundColor: black;
        color: white;
      }

      &[data-disabled] {
        color: gray;
      }
    }

    .subTrigger {
      ${itemCss}
      &:not([data-highlighted])[data-state="open"] {
        backgroundColor: gray;
        color: black;
      }
    }

    .separator {
      margin: 5px 10px;
      height: 1px;
      background-color: gray;
    }


    .contentAnimated {
      &[data-state="open"] {
        animation: animateIn 300ms ease;
      }

      &[data-state="closed"] {
        animation: animateOut 300ms ease;
      }
    }


    @keyframes animateIn {
      from: { transform: scale(0.95); opacity: 0; }
      to: { transform: scale(1); opacity: 1; }
    }

    @keyframes animateOut {
      from: { transform: scale(1); opacity: 1; }
      to: { transform: scale(0.95); opacity: 0; }
    }

`}</style>
);

export const TickIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="12"
    height="12"
    fill="none"
    stroke="currentcolor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="3"
  >
    <path d="M2 20 L12 28 30 4" />
  </svg>
);
