import React from "react";
import { Autocomplete } from "./Autocomplete";

export default {
  title: "Utilities/Autocomplete",
  excludeStories: ["TickIcon", "classes"],
  decorators: [
    (Story) => (
      <div>
        {/* storyStyles*/}
        <Story />
      </div>
    ),
  ],
};

export const Demo = () => {
  <Autocomplete>test autocomplete</Autocomplete>;
};
