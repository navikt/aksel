import React, { forwardRef } from "react";
import { useId } from "../../utils-external";
import { Menu } from "../../utils/components/floating-menu/Menu";
import { cl } from "../../utils/helpers";
import type { ActionMenuGroupLabelingProps } from "../ActionMenu.types";
import { ActionMenuLabel } from "../label/ActionMenuLabel";

type ActionMenuGroupElement = React.ElementRef<typeof Menu.Group>;
type MenuGroupProps = React.ComponentPropsWithoutRef<typeof Menu.Group>;

type ActionMenuGroupProps = Omit<MenuGroupProps, "asChild"> &
  ActionMenuGroupLabelingProps;

const ActionMenuGroup = forwardRef<
  ActionMenuGroupElement,
  ActionMenuGroupProps
>(({ children, className, label, ...rest }: ActionMenuGroupProps, ref) => {
  const labelId = useId();

  return (
    <Menu.Group
      ref={ref}
      {...rest}
      className={cl("aksel-action-menu__group", className)}
      asChild={false}
      aria-labelledby={label ? labelId : undefined}
    >
      {label && (
        <ActionMenuLabel id={labelId} aria-hidden>
          {label}
        </ActionMenuLabel>
      )}
      {children}
    </Menu.Group>
  );
});

export { ActionMenuGroup };
export type { ActionMenuGroupProps };
