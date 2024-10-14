import React from "react";
import "@navikt/ds-css/darkside/index.css";

export const DarkSideDekorator = () => {
  (StoryFn) => {
    return (
      <div style={{ background: "var(--a-bg-default) !important" }}>
        <StoryFn />
      </div>
    );
  };
};
