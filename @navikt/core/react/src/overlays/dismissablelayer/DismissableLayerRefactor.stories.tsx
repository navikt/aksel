import React, { StrictMode, useRef, useState } from "react";
import { HStack, VStack } from "../../layout/stack";
import { DismissableLayerRefactored as DismissableLayer } from "./DismissableLayerRefactored";

export default {
  title: "Utilities/DismissableLayerRefactor",
  parameters: {
    chromatic: { disable: true },
  },
};

export const ContextTest = {
  render: () => {
    return (
      <div>
        <DismissableLayer
          onDismiss={() => console.info("dismissed 1")}
          onEscapeKeyDown={() => console.info("Escaped 1")}
        >
          <input type="text" />
        </DismissableLayer>
        <DismissableLayer
          onDismiss={() => console.info("dismissed 2")}
          onEscapeKeyDown={() => console.info("Escaped 2")}
        >
          <input type="text" />
        </DismissableLayer>
      </div>
    );
  },
};

export const NestedTest = {
  render: () => {
    return (
      <div>
        <DismissableLayer
          onDismiss={() => console.info("dismissed 1")}
          onEscapeKeyDown={() => console.info("Escaped 1")}
          id="root-layer"
        >
          <input type="text" />
          <DismissableLayer
            onDismiss={() => console.info("dismissed-nested 1")}
            onEscapeKeyDown={() => console.info("Escaped-nested 1")}
            id="nested-layer"
          >
            <input type="text" />
          </DismissableLayer>
        </DismissableLayer>
        {/* <DismissableLayer
          onDismiss={() => console.info("dismissed 2")}
          onEscapeKeyDown={() => console.info("Escaped 2")}
          enabled={false}
        >
          <input type="text" />
        </DismissableLayer> */}
      </div>
    );
  },
};

export const NestedTestLegacy = {
  render: () => {
    return (
      <div>
        <DismissableLayer
          onDismiss={() => console.info("dismissed 1")}
          onEscapeKeyDown={() => console.info("Escaped 1")}
        >
          <input type="text" />
          <DismissableLayer
            onDismiss={() => console.info("dismissed-nested 1")}
            onEscapeKeyDown={() => console.info("Escaped-nested 1")}
          >
            <input type="text" />
          </DismissableLayer>
        </DismissableLayer>
        {/* <DismissableLayer
          onDismiss={() => console.info("dismissed 2")}
          onEscapeKeyDown={() => console.info("Escaped 2")}
          enabled={false}
        >
          <input type="text" />
        </DismissableLayer> */}
      </div>
    );
  },
};

export const Default = () => {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef(null);

  const [dismissOnEscape, setDismissOnEscape] = useState(false);
  const [dismissOnPointerDownOutside, setDismissOnPointerDownOutside] =
    useState(false);
  const [dismissOnFocusOutside, setDismissOnFocusOutside] = useState(false);
  const [disabledOutsidePointerEvents, setDisableOutsidePointerEvents] =
    useState(false);

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>DismissableLayer</h1>

      <div
        style={{ display: "inline-block", textAlign: "left", marginBottom: 20 }}
      >
        <label style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={dismissOnEscape}
            onChange={(event) => setDismissOnEscape(event.target.checked)}
          />{" "}
          Dismiss on escape?
        </label>

        <label style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={dismissOnPointerDownOutside}
            onChange={(event) =>
              setDismissOnPointerDownOutside(event.target.checked)
            }
          />{" "}
          Dismiss on pointer down outside?
        </label>

        <label style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={dismissOnFocusOutside}
            onChange={(event) => setDismissOnFocusOutside(event.target.checked)}
          />{" "}
          Dismiss on focus outside?
        </label>

        <hr />

        <label style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={disabledOutsidePointerEvents}
            onChange={(event) =>
              setDisableOutsidePointerEvents(event.target.checked)
            }
          />{" "}
          Disable outside pointer events?
        </label>
      </div>

      <div style={{ marginBottom: 20 }}>
        <button
          ref={openButtonRef}
          type="button"
          onClick={() => setOpen((x) => !x)}
        >
          {open ? "Close" : "Open"} layer
        </button>
      </div>

      {open ? (
        <DismissableLayer
          asChild
          onEscapeKeyDown={(event) => {
            console.log("Escape key down");
            if (dismissOnEscape === false) {
              event.preventDefault();
            }
          }}
          onPointerDownOutside={(event) => {
            console.log("Pointer down outside");
            if (
              dismissOnPointerDownOutside === false ||
              event.target === openButtonRef.current
            ) {
              event.preventDefault();
            }
          }}
          onFocusOutside={(event) => {
            console.log("Focus outside");
            if (dismissOnFocusOutside === false) {
              event.preventDefault();
            }
          }}
          disableOutsidePointerEvents={disabledOutsidePointerEvents}
          onDismiss={() => setOpen(false)}
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            verticalAlign: "middle",
            width: 400,
            height: 300,
            backgroundColor: "black",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <input type="text" />
        </DismissableLayer>
      ) : null}

      <div style={{ marginBottom: 20 }}>
        <input type="text" defaultValue="hello" style={{ marginRight: 20 }} />
        <button type="button" onMouseDown={() => alert("hey!")}>
          hey!
        </button>
      </div>
    </div>
  );
};

export const Nested = () => {
  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>DismissableLayer (nested)</h1>
      <DismissableBox index={0} />
    </div>
  );
};

function DismissableBox(props) {
  const [open, setOpen] = React.useState(false);
  const openButtonRef = React.useRef(null);

  const disableOutsidePointer = props.index % 3 === 0 && props.index !== 0;

  const beforeDisableOutsidePointer =
    (props.index + 1) % 3 === 0 && props.index > 0;

  return (
    <DismissableLayer
      {...props}
      onEscapeKeyDown={() => {
        console.log("Escape key down");
      }}
      disableOutsidePointerEvents={disableOutsidePointer}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        padding: 20,
        backgroundColor: `rgba(0, 0, ${props.index * 90}, 0.1)`,
        borderRadius: 10,
        marginTop: 20,
        ...props.style,
      }}
    >
      <div style={{ display: "grid" }}>
        <button
          ref={openButtonRef}
          type="button"
          onClick={() => setOpen((x) => !x)}
        >
          {open ? "Close" : "Open"} new layer
        </button>
        {disableOutsidePointer ? (
          <span style={{ color: "white" }}>DisableOutsidePointer</span>
        ) : null}
        {beforeDisableOutsidePointer ? (
          <span style={{ color: "white" }}>Before DisableOutsidePointer</span>
        ) : null}
      </div>

      {open ? (
        <DismissableBox
          index={props.index + 1}
          onPointerDownOutside={(event) => {
            if (event.target === openButtonRef.current) {
              event.preventDefault();
            }
          }}
          onFocusOutside={(event) => event.preventDefault()}
          onDismiss={() => setOpen(false)}
        />
      ) : null}
    </DismissableLayer>
  );
}

export const DisableOutsidePointerEventsWhileHidden = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div>
      <DismissableLayer disableOutsidePointerEvents={true} enabled={enabled}>
        <div style={{ height: 100, width: 100, background: "red" }}>
          <DismissableLayer disableOutsidePointerEvents={true} enabled={false}>
            <div style={{ height: 50, width: 50, background: "blue" }} />
          </DismissableLayer>
        </div>
      </DismissableLayer>
      <button onClick={() => setEnabled((x) => !x)}>Should be clickable</button>
    </div>
  );
};

export const ParallelDismissableLayer = () => {
  const [single, setSingle] = useState(false);
  const [double, setDouble] = useState(false);
  const [nestedSingle, setNestedSingle] = useState(false);
  const [nestedDouble, setNestedDouble] = useState(false);

  const Layer = ({
    disableOutsidePointerEvents,
    children,
  }: {
    disableOutsidePointerEvents?: boolean;
    children?: React.ReactNode;
  }) => {
    const [open, setOpen] = useState(true);

    if (!open) return null;

    const style = {
      width: 100,
      height: 100,
      backgroundColor: "red",
    };

    return (
      <DismissableLayer
        disableOutsidePointerEvents={disableOutsidePointerEvents}
        style={style}
      >
        <button onClick={() => setOpen(false)}>Close me</button>
        {children}
      </DismissableLayer>
    );
  };

  const state = (_state: boolean) => (_state ? "open" : "closed");

  return (
    <StrictMode>
      <VStack gap="4">
        <HStack gap="2">
          <button onClick={() => setSingle((x) => !x)}>
            Single {state(single)}
          </button>
          <button onClick={() => setDouble((x) => !x)}>
            Double {state(double)}
          </button>
          <button onClick={() => setNestedSingle((x) => !x)}>
            Nested Single {state(nestedSingle)}
          </button>
          <button onClick={() => setNestedDouble((x) => !x)}>
            Nested Double {state(nestedDouble)}
          </button>
        </HStack>

        {single && <Layer disableOutsidePointerEvents />}
        {double && (
          <div>
            <Layer disableOutsidePointerEvents />
            <Layer disableOutsidePointerEvents />
          </div>
        )}
        {nestedSingle && (
          <Layer disableOutsidePointerEvents>
            <Layer disableOutsidePointerEvents />
          </Layer>
        )}
        {nestedDouble && (
          <div>
            <Layer disableOutsidePointerEvents>
              <Layer />
            </Layer>
            <Layer>
              <Layer disableOutsidePointerEvents />
            </Layer>
          </div>
        )}

        <button>Focustrap (does nothing)</button>
        <button
          onClick={() => {
            setSingle(false);
            setDouble(false);
            setNestedSingle(false);
            setNestedDouble(false);
          }}
        >
          Reset
        </button>
      </VStack>
    </StrictMode>
  );
};
