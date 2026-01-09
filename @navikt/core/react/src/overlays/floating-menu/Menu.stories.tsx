import { Meta } from "@storybook/react-vite";
import React, { useRef, useState } from "react";
import { Menu } from "./Menu";

export default {
  title: "Utilities/FloatingMenu",
  decorators: [
    (Story) => (
      <div>
        {storyStyles}
        <Story />
      </div>
    ),
  ],
  parameters: { chromatic: { disable: true } },
} satisfies Meta<typeof Menu>;

export const Styled = () => (
  <MenuWithAnchor>
    <Menu.Item className="item" onSelect={() => window.alert("undo")}>
      Undo
    </Menu.Item>
    <Menu.Item className="item" onSelect={() => window.alert("redo")}>
      Redo
    </Menu.Item>
    <Menu.Divider className="separator" />
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

      <Menu.Divider className="separator" />
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
          <div className="label" key={foodGroup.label}>
            {foodGroup.label}
          </div>
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
          <Menu.Divider className="separator" />
        )}
      </Menu.Group>
    ))}
  </MenuWithAnchor>
);

WithLabels.parameters = {
  layout: "padded",
};

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
        {selection.length === options.length ? <TickIcon /> : <div>—</div>}
      </Menu.CheckboxItem>
      <Menu.Divider className="separator" />
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
          <Menu.ItemIndicator>
            <TickIcon />
          </Menu.ItemIndicator>
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
      <Menu.Divider className="separator" />
      <Menu.RadioGroup value={file} onValueChange={setFile}>
        {files.map((_file) => (
          <Menu.RadioItem key={_file} className="item" value={_file}>
            {_file}
            <Menu.ItemIndicator>
              <CircleIcon />
            </Menu.ItemIndicator>
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
              <Menu.ItemIndicator>
                <TickIcon />
              </Menu.ItemIndicator>
            </Menu.CheckboxItem>
          ),
        )}
        <Menu.RadioGroup value={file} onValueChange={setFile}>
          {files.map((_file) => (
            <Menu.RadioItem key={_file} className="item" value={_file}>
              {_file}
              <Menu.ItemIndicator>
                <TickIcon />
              </Menu.ItemIndicator>
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

const MenuWithAnchor = (props: MenuProps) => {
  const { open = true, children, ...contentProps } = props;
  return (
    <Menu open={open} onOpenChange={() => {}} modal={false}>
      <Menu.Anchor>
        <div />
      </Menu.Anchor>
      <Menu.Portal>
        <Menu.Content
          className="content"
          returnFocus={false}
          align="start"
          {...contentProps}
        >
          {children}
        </Menu.Content>
      </Menu.Portal>
    </Menu>
  );
};

export const MenuWithOpenButton = () => {
  const [open, setOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Menu open={open} onOpenChange={() => setOpen((x) => !x)} modal={false}>
      <Menu.Anchor asChild>
        <button
          ref={triggerRef}
          type="button"
          onPointerDown={(event) => {
            // Only open if it's the left button (mousedown gets triggered by all mouse buttons)
            // but not when the control key is pressed (avoiding MacOS right click)
            if (event.button === 0 && event.ctrlKey === false) {
              setOpen((x) => !x);
              if (!open) {
                // Prevent trigger focusing when opening
                // This allows the content to be given focus without competition
                event.preventDefault();

                // Close if pointerUp outside of the content/trigger
                const cb = (e: PointerEvent) => {
                  if (!(e.target instanceof Node)) return;
                  const isInsideSafezone =
                    contentRef.current?.contains(e.target) ||
                    triggerRef.current?.contains(e.target) ||
                    e.target === triggerRef.current ||
                    e.target === contentRef.current;

                  if (!isInsideSafezone) {
                    setOpen(false);
                  }
                };
                document.addEventListener("pointerup", cb, {
                  once: true,
                });
              }
            }
          }}
          onPointerUp={(event) => {
            console.log(event);
          }}
          onKeyDown={(event) => {
            if (["Enter", " "].includes(event.key)) setOpen((x) => !x);
            if (event.key === "ArrowDown") setOpen(true);
            // Prevent keydown from scrolling window / first focused item to execute
            // that keydown (inadvertently closing the menu)
            if (["Enter", " ", "ArrowDown"].includes(event.key))
              event.preventDefault();
          }}
        >
          button
        </button>
      </Menu.Anchor>
      <Menu.Portal>
        <Menu.Content
          className="content"
          align="start"
          ref={contentRef}
          returnFocus={triggerRef}
        >
          <Menu.Item className="item" onSelect={() => window.alert("undo")}>
            Undo
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("redo")}>
            Redo
          </Menu.Item>
          <Menu.Divider className="separator" />
          <Menu.Item
            className="item"
            disabled
            onSelect={() => window.alert("cut")}
          >
            Cut
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("copy")}>
            Copy
          </Menu.Item>
          <Menu.Item className="item" onSelect={() => window.alert("paste")}>
            Paste
          </Menu.Item>
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

export const TestMenu = () => {
  return (
    <Menu open onOpenChange={() => {}} modal={true}>
      <Menu.Anchor asChild>
        <button>Menu</button>
      </Menu.Anchor>
      <Menu.Portal>
        <Menu.Content className="content" returnFocus={false} align="start">
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
  white-space: nowrap;
  height: 25px;
  padding: 0 10px;
  color: black;
  border-radius: 3px;
`;

const storyStyles = (
  <style>{`

    *:focus {
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
      font-weight: 600;
      font-size: 14px;
      background-color: var(--a-gray-100);
    }

    .item {
      ${itemCss}
      outline: none;


      &[data-disabled] {
        color: gray !important;
      }

      >[data-state="unchecked"]{
        visibility: hidden;
      }
    }

    .subTrigger {
      ${itemCss}

      &[data-disabled] {
        color: gray;
      }
    }

    .separator {
      margin: 5px 10px;
      height: 1px;
      background-color: gray;
    }


    .contentAnimated[data-state="open"] {
      animation: animateIn 300ms ease;
    }

    .contentAnimated[data-state="closed"] {
      animation: animateOut 300ms ease;
    }


    @keyframes animateIn {
      from { transform: scale(0.95); opacity: 0.01; }
      to { transform: scale(1); opacity: 1; }
    }

    @keyframes animateOut {
      from { transform: scale(1); opacity: 1; }
      to { transform: scale(0.95); opacity: 0; }
    }

`}</style>
);

const TickIcon = () => (
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

const CircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="12"
    height="12"
    fill="none"
    stroke="currentcolor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="6"
  >
    <circle cx="16" cy="16" r="4" />
  </svg>
);
