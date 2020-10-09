import React from "react";

const Sidebar = ({ className = "" }) => {
  return (
    <nav className={className}>
      <ul>
        <li>nav1</li>
        <li>nav2</li>
        <li>nav3</li>
      </ul>
    </nav>
  );
};

export default Sidebar;
