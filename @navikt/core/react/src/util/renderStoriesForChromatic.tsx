import { Args, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Renderer, StoryContext } from "storybook/internal/types";

type StoryFnOrObj =
  | { render?: (...args: any[]) => React.ReactNode; args?: Args }
  | React.FunctionComponent;

export function renderStoriesForChromatic(
  stories: Record<string, StoryFnOrObj>,
  Component?: React.FunctionComponent<any>,
): StoryObj {
  return {
    render: (...args: [Args, StoryContext<Renderer, Args>]) => (
      <>
        {Object.entries(stories).map(([storyName, Story]) => (
          <div key={storyName}>
            <h2 className="storyheading">{storyName}</h2>
            {resolveComponent(Story, args, Component)}
          </div>
        ))}
      </>
    ),
    parameters: {
      chromatic: { disable: false },
      controls: { disable: true },
    },
  };
}

function resolveComponent(
  Story: StoryFnOrObj,
  args: [Args, StoryContext<Renderer, Args>],
  Component?: React.FunctionComponent,
) {
  if (typeof Story === "function") {
    return <Story />;
  }
  if (Story.render) {
    return Story.render(...args);
  }
  if (Story.args && Component) {
    return <Component {...Story.args} />;
  }
  return <p>renderStoriesForChromatic was unable to render this story!</p>;
}
