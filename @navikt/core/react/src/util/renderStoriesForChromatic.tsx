import { Args } from "@storybook/react";
import React from "react";
import { Renderer, StoryContext } from "storybook/internal/types";
import VStack from "../layout/stack/VStack";

export function renderStoriesForChromatic(
  stories: Record<
    string,
    | { render?: (...args: any[]) => React.ReactNode }
    | React.FunctionComponent<void>
  >,
) {
  return {
    render: (...args: [Args, StoryContext<Renderer, Args>]) => (
      <VStack gap="space-16">
        {Object.entries(stories).map(([storyName, story]) => (
          <div key={storyName}>
            <h2>{storyName}</h2>
            {typeof story === "function" ? story() : story.render?.(...args)}
          </div>
        ))}
      </VStack>
    ),
    parameters: {
      chromatic: { disable: false },
    },
  };
}
