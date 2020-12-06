import React from "react";
import Link from "../src/index";

export default {
  title: "@nav-frontend/react-link",
  component: Link,
};

export const All = () => {
  return (
    <>
      <h1>Link</h1>
      <Link>Dette er en tekstlenke</Link>
    </>
  );
};
