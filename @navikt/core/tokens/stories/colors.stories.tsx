import React from "react";
import { Meta } from "@storybook/react";
import tokens from "../docs.json";

export default {
  title: "ds-tokens/Colors",
} as Meta;

const ColorGroups = ({ prefix }: { prefix: string }) => (
  <div>
    {Object.entries(tokens)
      .filter(([group]) => group.startsWith(prefix))
      .map(([group, groupTokens]) => {
        const groupName = group.replace(prefix, "");
        return (
          <div key={group} className="colgap">
            <h2>
              {groupName.charAt(0).toLocaleUpperCase() + groupName.substring(1)}
            </h2>
            {groupTokens.map((color) => (
              <div
                key={color.name}
                style={{
                  background: color.value,
                  width: "50rem",
                  height: "5rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    background: "rgba(39,39,39,0.4)",
                    width: "fit-content",
                    color: "white",
                    padding: 2,
                    fontSize: 14,
                  }}
                >
                  {color.name}
                </div>
              </div>
            ))}
          </div>
        );
      })}
  </div>
);

export const Global = () => <ColorGroups prefix="global-" />;
export const Semantic = () => <ColorGroups prefix="semantic-" />;
