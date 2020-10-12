import React from "react";

const Main = ({ className = "", children }) => {
  return <main className={className}>{children}</main>;
};

export default Main;
