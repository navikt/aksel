import React from "react";

const MenuItems = ({ children }: { children: React.ReactNode }) => (
  <ul className="navds-menu__list">
    {React.Children.toArray(children).map((child, i) => (
      <li key={i} className="navds-menu__list-item">
        {child}
      </li>
    ))}
  </ul>
);

export default MenuItems;
