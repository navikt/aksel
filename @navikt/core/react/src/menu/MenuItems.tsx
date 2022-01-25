import cl from "classnames";
import React from "react";

const MenuItems = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <ul {...rest} className={cl("navds-menu__list", className)}>
    {React.Children.toArray(children).map((child, i) => (
      <li key={i} className="navds-menu__list-item">
        {child}
      </li>
    ))}
  </ul>
);

export default MenuItems;
