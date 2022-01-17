import React from "react";
import cl from "classnames";

const MenuItems = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <ul className={cl("navds-menu__list", className)}>
    {React.Children.toArray(children).map((child, i) => (
      <li key={i} className="navds-menu__list-item">
        {child}
      </li>
    ))}
  </ul>
);

export default MenuItems;
