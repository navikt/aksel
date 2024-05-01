import React from "react";
import { createContext } from "../../util/create-context";
import { useCallbackRef } from "../../util/hooks";
import { MenuGroup, MenuGroupProps } from "./Menu.Group";

const [RadioGroupProvider, useRadioGroupContext] =
  createContext<MenuRadioGroupProps>({
    providerName: "MenuRadioGroupProvider",
    hookName: "useRadioGroupContext",
    defaultValue: {
      value: undefined,
      onValueChange: () => {},
    },
  });

interface MenuRadioGroupProps extends MenuGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

const MenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof MenuGroup>,
  MenuRadioGroupProps
>(({ value, onValueChange, ...rest }: MenuRadioGroupProps, ref) => {
  const handleValueChange = useCallbackRef(onValueChange);
  return (
    <RadioGroupProvider value={value} onValueChange={handleValueChange}>
      <MenuGroup {...rest} ref={ref} />
    </RadioGroupProvider>
  );
});

export {
  MenuRadioGroup,
  RadioGroupProvider,
  useRadioGroupContext,
  type MenuRadioGroupProps,
};
