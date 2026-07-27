import React, { forwardRef } from "react";
import { useId } from "../../utils-external";
import { Menu } from "../../utils/components/floating-menu/Menu";
import type { ActionMenuGroupLabelingProps } from "../ActionMenu.types";
import { ActionMenuLabel } from "../label/ActionMenuLabel";

type ActionMenuRadioGroupElement = React.ElementRef<typeof Menu.RadioGroup>;
type MenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof Menu.RadioGroup
>;
type ActionMenuRadioGroupProps = ActionMenuGroupLabelingProps &
  Omit<MenuRadioGroupProps, "asChild"> & {
    children: React.ReactNode;
  };

const ActionMenuRadioGroup = forwardRef<
  ActionMenuRadioGroupElement,
  ActionMenuRadioGroupProps
>(({ children, label, ...rest }: ActionMenuRadioGroupProps, ref) => {
  const labelId = useId();

  return (
    <Menu.RadioGroup
      ref={ref}
      {...rest}
      asChild={false}
      aria-labelledby={label ? labelId : undefined}
    >
      {label && (
        <ActionMenuLabel id={labelId} aria-hidden>
          {label}
        </ActionMenuLabel>
      )}
      {children}
    </Menu.RadioGroup>
  );
});

export { ActionMenuRadioGroup };
export type { ActionMenuRadioGroupProps };
