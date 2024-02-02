import * as React from "react";
import Portal from "../portal/Portal";
import Floating from "./Floating";

export default {
  title: "Utilities/Floating",
  parameters: {
    chromatic: { disable: true },
  },
};

export const StyledFloatingElement = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Scrollable>
      <Floating>
        <Floating.Anchor className="anchor" onClick={() => setOpen(true)}>
          open
        </Floating.Anchor>

        {open && (
          <Floating.Content
            className="content"
            sideOffset={5}
            arrow={{ height: 10, width: 10, className: "arrow" }}
          >
            <button onClick={() => setOpen(false)}>close</button>
          </Floating.Content>
        )}
      </Floating>
    </Scrollable>
  );
};

export const WithPortal = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Scrollable>
      <Floating>
        <Floating.Anchor className="anchor" onClick={() => setOpen(true)}>
          open
        </Floating.Anchor>

        {open && (
          <Portal asChild>
            <Floating.Content
              className="content"
              sideOffset={5}
              arrow={{ height: 10, width: 10, className: "arrow" }}
            >
              <button onClick={() => setOpen(false)}>close</button>
            </Floating.Content>
          </Portal>
        )}
      </Floating>
    </Scrollable>
  );
};

export const WithUpdatePositionStrategyAlways = () => {
  const [open, setOpen] = React.useState(false);
  const [left, setLeft] = React.useState(0);
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setLeft((prev) => (prev + 50) % 300);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <Scrollable>
      <Floating>
        <Floating.Anchor
          className="anchor"
          onClick={() => setOpen(true)}
          style={{ marginLeft: left }}
        >
          open
        </Floating.Anchor>

        {open && (
          <Floating.Content
            className="content"
            sideOffset={5}
            updatePositionStrategy="always"
            arrow={{ height: 20, width: 10, className: "arrow" }}
          >
            <button onClick={() => setOpen(false)}>close</button>
          </Floating.Content>
        )}
      </Floating>
    </Scrollable>
  );
};

function Scrollable(props: any) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "200vh",
      }}
      {...props}
    >
      <style>{`
      .anchor{
        background: red;
        width: 100px;
        height: 100px;
      }

      .content {
        transform-origin: var(--ac-floating-transform-origin);
        background-color: var(--a-gray-100);
        border-radius: var(--a-border-radius-large);
        width: 300px;
        height: 150px;
        display: grid;
        place-content: center;
      }

      .arrow{
        background: transparent;
        fill: var(--a-gray-100);
      }
      `}</style>
      {props?.children}
    </div>
  );
}
