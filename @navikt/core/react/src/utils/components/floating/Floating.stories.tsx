import React, { useState } from "react";
import { Portal } from "../../../portal";
import { Floating } from "./Floating";

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
          <Portal>
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

export const PropsCheck = () => {
  const [scrollContainer1, setScrollContainer1] =
    useState<HTMLDivElement | null>(null);
  const [scrollContainer2, setScrollContainer2] =
    useState<HTMLDivElement | null>(null);

  return (
    <div style={{ paddingBottom: 500 }}>
      <style>{`
      .anchor-small {
        background: red;
        width: 40px;
        height: 40px;
      }

      .content-small {
        transform-origin: var(--__axc-floating-transform-origin);
        background-color: var(--ax-bg-neutral-moderate);
        border-radius: var(--ax-radius-8);
        width: 100px;
        height: 50px;
        display: grid;
        place-content: center;
      }

      .arrow {
        background: transparent;
        fill: var(--ax-bg-neutral-moderate);
      }
      `}</style>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 150,

          position: "fixed",
          top: 0,
          left: 0,
          right: 0,

          backgroundColor: "grey",
          border: "1px solid black",
        }}
      >
        <h1>In fixed header</h1>
        <Floating>
          <Floating.Anchor className="anchor-small">1</Floating.Anchor>
          <Floating.Content
            className="content-small"
            sideOffset={5}
            arrow={{ height: 5, width: 10, className: "arrow" }}
          >
            1
          </Floating.Content>
        </Floating>

        <Floating>
          <Floating.Anchor className="anchor-small">2</Floating.Anchor>
          <Portal>
            <Floating.Content
              className="content-small"
              sideOffset={5}
              arrow={{ height: 5, width: 10, className: "arrow" }}
            >
              (portalled)
            </Floating.Content>
          </Portal>
        </Floating>
      </header>

      <div
        style={{
          marginTop: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 150,
          border: "1px solid black",
        }}
      >
        <h1>In normal page flow</h1>
        <Floating>
          <Floating.Anchor className="anchor-small">3</Floating.Anchor>
          <Floating.Content
            className="content-small"
            sideOffset={5}
            arrow={{ height: 5, width: 10, className: "arrow" }}
          >
            3
          </Floating.Content>
        </Floating>

        <Floating>
          <Floating.Anchor className="anchor-small">4</Floating.Anchor>
          <Portal>
            <Floating.Content
              className="content-small"
              sideOffset={5}
              arrow={{ height: 5, width: 10, className: "arrow" }}
            >
              4 (portalled)
            </Floating.Content>
          </Portal>
        </Floating>
      </div>

      <div
        style={{
          position: "relative",
          marginTop: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 150,
          border: "1px solid black",
        }}
      >
        <h1>In relative parent</h1>
        <Floating>
          <Floating.Anchor className="anchor-small">5</Floating.Anchor>
          <Floating.Content
            className="content-small"
            sideOffset={5}
            arrow={{ height: 5, width: 10, className: "arrow" }}
          >
            5
          </Floating.Content>
        </Floating>

        <Floating>
          <Floating.Anchor className="anchor-small">6</Floating.Anchor>
          <Portal>
            <Floating.Content
              className="content-small"
              sideOffset={5}
              arrow={{ height: 5, width: 10, className: "arrow" }}
            >
              6 (portalled)
            </Floating.Content>
          </Portal>
        </Floating>
      </div>

      <div
        style={{
          marginTop: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 150,
          border: "1px solid black",
          transform: "translate3d(100px, 0, 0)",
        }}
      >
        <h1>In translated parent</h1>
        <Floating>
          <Floating.Anchor className="anchor-small">7</Floating.Anchor>
          <Floating.Content
            className="content-small"
            sideOffset={5}
            arrow={{ height: 5, width: 10, className: "arrow" }}
          >
            7
          </Floating.Content>
        </Floating>

        <Floating>
          <Floating.Anchor className="anchor-small">8</Floating.Anchor>
          <Portal>
            <Floating.Content
              className="content-small"
              sideOffset={5}
              arrow={{ height: 5, width: 10, className: "arrow" }}
            >
              8 (portalled)
            </Floating.Content>
          </Portal>
        </Floating>
      </div>

      <div style={{ display: "flex", gap: 100 }}>
        <div>
          <h1>In scrolling container</h1>
          <div
            ref={setScrollContainer1}
            style={{
              width: 400,
              height: 600,
              overflow: "auto",
              border: "1px solid black",
            }}
          >
            <div style={{ height: 2000 }}>
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 150,
                    paddingBottom: 100,
                  }}
                >
                  <Floating>
                    <Floating.Anchor className="anchor-small">
                      9.{i + 1}
                    </Floating.Anchor>
                    <Floating.Content
                      className="content-small"
                      sideOffset={5}
                      hideWhenDetached
                      collisionBoundary={scrollContainer1}
                      arrow={{ height: 5, width: 10, className: "arrow" }}
                    >
                      9.{i + 1}
                    </Floating.Content>
                  </Floating>

                  <Floating>
                    <Floating.Anchor className="anchor-small">
                      10.{i + 1}
                    </Floating.Anchor>
                    <Portal>
                      <Floating.Content
                        className="content-small"
                        sideOffset={5}
                        hideWhenDetached
                        collisionBoundary={scrollContainer1}
                        arrow={{ height: 5, width: 10, className: "arrow" }}
                      >
                        10.{i + 1} (portalled)
                      </Floating.Content>
                    </Portal>
                  </Floating>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h1>With position sticky</h1>
          <div
            ref={setScrollContainer2}
            style={{
              width: 400,
              height: 600,
              overflow: "auto",
              border: "1px solid black",
            }}
          >
            <div style={{ height: 2000 }}>
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 150,
                    paddingBottom: 100,
                    position: "sticky",
                    top: 0,
                  }}
                >
                  <Floating>
                    <Floating.Anchor className="anchor-small">
                      9.{i + 1}
                    </Floating.Anchor>
                    <Floating.Content
                      className="content-small"
                      sideOffset={5}
                      hideWhenDetached
                      collisionBoundary={scrollContainer2}
                      arrow={{ height: 5, width: 10, className: "arrow" }}
                    >
                      9.{i + 1}
                    </Floating.Content>
                  </Floating>

                  <Floating>
                    <Floating.Anchor className="anchor-small">
                      10.{i + 1}
                    </Floating.Anchor>
                    <Portal>
                      <Floating.Content
                        className="content-small"
                        sideOffset={5}
                        hideWhenDetached
                        collisionBoundary={scrollContainer2}
                        arrow={{ height: 5, width: 10, className: "arrow" }}
                      >
                        10.{i + 1} (portalled)
                      </Floating.Content>
                    </Portal>
                  </Floating>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
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
        width: "200vw",
      }}
      {...props}
    >
      <style>{`
      .anchor {
        background: red;
        width: 100px;
        height: 100px;
      }

      .content {
        transform-origin: var(--__axc-floating-transform-origin);
        background-color: var(--ax-bg-neutral-moderate);
        border-radius: var(--ax-radius-8);
        width: 300px;
        height: 150px;
        display: grid;
        place-content: center;
      }

      .arrow {
        background: transparent;
        fill: var(--ax-bg-neutral-moderate);
      }
      `}</style>
      {props?.children}
    </div>
  );
}
