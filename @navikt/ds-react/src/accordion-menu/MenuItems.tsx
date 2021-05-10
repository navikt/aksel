import React from "react";

/**
 * @ignore
 */
const MenuItems = ({ children }: { children: React.ReactNode }) => (
  <ul className="navds-accordion-menu__list">
    {React.Children.toArray(children).map((child, i) => (
      <li key={i} className="navds-accordion-menu__list-item">
        {child}
      </li>
    ))}
  </ul>
);

export default MenuItems;
