import React from "react";
import { Box } from "../layout/box";
import { Provider } from "../provider";
import { Portal } from "./Portal";

export default {
  title: "Utilities/Portal",
  parameters: {
    chromatic: { disable: true },
  },
};

export const Default = () => {
  return (
    <Box background="neutral-soft">
      <h1>In regular DOM tree</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        necessitatibus quis esse nesciunt est velit voluptatibus. Distinctio eum
        commodi tempora unde. Nulla vel tempora incidunt? Voluptatem molestias
        impedit commodi. Tenetur!
      </p>
      <Portal>
        <h1>Inside Portal to different DOM tree</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          necessitatibus quis esse nesciunt est velit voluptatibus. Distinctio
          eum commodi tempora unde. Nulla vel tempora incidunt? Voluptatem
          molestias impedit commodi. Tenetur!
        </p>
      </Portal>
    </Box>
  );
};

export const CustomPortalRoot = () => {
  const [portalContainer, setPortalContainer] =
    React.useState<HTMLDivElement | null>(null);

  return (
    <div style={{ background: "red", padding: "1rem" }}>
      <div style={{ background: "orange" }}>
        <h1>Tree A</h1>
        <Portal rootElement={portalContainer}>
          <p>This is mounted to Tree B, while created inside Tree A</p>
        </Portal>
      </div>
      <div ref={setPortalContainer} style={{ background: "lightgray" }}>
        <h1>Tree B</h1>
      </div>
    </div>
  );
};

export const CustomPortalRootFromProvider = () => {
  const [portalContainer, setPortalContainer] =
    React.useState<HTMLDivElement>();

  return (
    <Provider rootElement={portalContainer}>
      <div style={{ background: "red", padding: "1rem" }}>
        <div style={{ background: "orange" }}>
          <h1>Tree A</h1>
          <Portal>
            <p>This is mounted to Tree B, while created inside Tree A</p>
          </Portal>
        </div>
        <div
          style={{ background: "lightgray" }}
          ref={(el) => {
            el && setPortalContainer(el);
          }}
        >
          <h1>Tree B</h1>
        </div>
      </div>
    </Provider>
  );
};

export const Nested = () => {
  return (
    <Box>
      <Portal data-test-prop="root-portal">
        <h2>Root portal</h2>
        <Portal>
          <h3>Nested portal</h3>
          <Portal>
            <h4>2x Nested portal</h4>
          </Portal>
        </Portal>
      </Portal>

      <Portal>
        <h2>Root-2 portal</h2>
        <Portal>
          <h3>Nested-2 portal</h3>
          <Portal>
            <h4>2x Nested-2 portal</h4>
          </Portal>
        </Portal>
      </Portal>
    </Box>
  );
};
