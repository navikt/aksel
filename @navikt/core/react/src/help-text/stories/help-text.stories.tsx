import React from "react";
import { BodyLong } from "../../typography";
import { HelpText } from "../index";

export default {
  title: "ds-react/help-text",
  component: HelpText,
};

export const All = () => {
  return (
    <>
      <h1>HelpText</h1>
      <BodyLong style={{ display: "flex" }}>
        Quis tempor incididunt sint sit veniam ad dolore cillum ut.
        <HelpText title="show tooltip">
          Id ullamco excepteur elit fugiat labore.
        </HelpText>
      </BodyLong>

      <BodyLong>
        Incididunt pariatur laborum dolor sint qui eiusmod exercitation non
        cupidatat amet.
      </BodyLong>

      <h2>HelpText defaultOpen</h2>
      <HelpText title="show tooltip">
        Id ullamco excepteur elit fugiat labore.
      </HelpText>
    </>
  );
};
