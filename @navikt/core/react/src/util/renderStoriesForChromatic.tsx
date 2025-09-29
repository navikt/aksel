import { Args, StoryObj } from "@storybook/react";
import React from "react";
import { Renderer, StoryContext } from "storybook/internal/types";

export function renderStoriesForChromatic(
  stories: Record<
    string,
    { render?: (...args: any[]) => React.ReactNode } | React.FunctionComponent
  >,
): StoryObj {
  return {
    render: (...args: [Args, StoryContext<Renderer, Args>]) => (
      <>
        {Object.entries(stories).map(([storyName, Story]) => (
          <div key={storyName}>
            <h2 className="storyheading">{storyName}</h2>
            {typeof Story === "function" ? <Story /> : Story.render?.(...args)}
          </div>
        ))}
      </>
    ),
    parameters: {
      chromatic: { disable: false },
    },
  };
}
