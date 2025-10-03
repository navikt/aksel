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
    <Box background="surface-neutral-subtle">
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
    <Box background="surface-neutral-subtle">
      <Box background="surface-alt-1-subtle">
        <h1>Tree A</h1>
        <Portal rootElement={portalContainer}>
          <p>This is mounted to Tree B, while created inside Tree A</p>
        </Portal>
      </Box>
      <Box background="surface-alt-3-subtle" ref={setPortalContainer}>
        <h1>Tree B</h1>
      </Box>
    </Box>
  );
};

export const CustomPortalRootFromProvider = () => {
  const [portalContainer, setPortalContainer] =
    React.useState<HTMLDivElement>();

  return (
    <Provider rootElement={portalContainer}>
      <Box background="surface-neutral-subtle">
        <Box background="surface-alt-1-subtle">
          <h1>Tree A</h1>
          <Portal>
            <p>This is mounted to Tree B, while created inside Tree A</p>
          </Portal>
        </Box>
        <Box
          background="surface-alt-3-subtle"
          ref={(el) => {
            el && setPortalContainer(el);
          }}
        >
          <h1>Tree B</h1>
        </Box>
      </Box>
    </Provider>
  );
};

export const AsChild = () => {
  return (
    <Box background="surface-neutral-subtle">
      <h1>In regular DOM tree</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        necessitatibus quis esse nesciunt est velit voluptatibus. Distinctio eum
        commodi tempora unde. Nulla vel tempora incidunt? Voluptatem molestias
        impedit commodi. Tenetur!
      </p>
      <Portal asChild>
        <div data-this-is-the-child>
          <h1>Inside Portal to different DOM tree</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            necessitatibus quis esse nesciunt est velit voluptatibus. Distinctio
            eum commodi tempora unde. Nulla vel tempora incidunt? Voluptatem
            molestias impedit commodi. Tenetur!
          </p>
        </div>
      </Portal>
    </Box>
  );
};
