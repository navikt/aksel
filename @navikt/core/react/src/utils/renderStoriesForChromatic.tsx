import type { Args, StoryObj } from "@storybook/react-vite";
import React from "react";

type StoryFnOrObj =
  | { render?: (...args: any[]) => React.ReactNode; args?: Args }
  | (React.FunctionComponent & { args?: Args });

export function renderStoriesForChromatic(
  stories: Record<string, StoryFnOrObj>,
  Component?: React.FunctionComponent<any>,
): StoryObj {
  return {
    render: () => (
      <>
        {Object.entries(stories).map(([storyName, Story]) => (
          <div key={storyName}>
            <h2 className="storyheading">{storyName}</h2>
            {resolveComponent(Story, Component)}
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
  Component?: React.FunctionComponent,
) {
  if (typeof Story === "function") {
    return <Story {...(Story.args || {})} />;
  }
  if (Story.render) {
    return Story.render(Story.args || {});
  }
  if (Story.args && Component) {
    return <Component {...Story.args} />;
  }
  return <p>renderStoriesForChromatic was unable to render this story!</p>;
}
