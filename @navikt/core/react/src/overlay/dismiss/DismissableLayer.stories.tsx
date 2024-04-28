import React, { useRef, useState } from "react";
import DismissableLayer from "./DismissableLayer";

export default {
  title: "Utilities/DismissableLayer",
  parameters: {
    chromatic: { disable: true },
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

  return (
    <DismissableLayer
      {...props}
      onEscapeKeyDown={() => {
        console.log("Escape key down");
      }}
      disableOutsidePointerEvents={props.index % 3 === 0}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 10,
        marginTop: 20,
        ...props.style,
      }}
    >
      <div>
        <button
          ref={openButtonRef}
          type="button"
          onClick={() => setOpen((x) => !x)}
        >
          {open ? "Close" : "Open"} new layer
        </button>
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

export const DisableOutsidePointerEventsWhileHidden = () => (
  <div>
    <DismissableLayer disableOutsidePointerEvents={true} enabled={false}>
      <div style={{ height: 100, width: 100, background: "red" }}>
        <DismissableLayer disableOutsidePointerEvents={true} enabled={false}>
          <div style={{ height: 50, width: 50, background: "blue" }} />
        </DismissableLayer>
      </div>
    </DismissableLayer>
    <button onClick={console.log}>Should be clickable</button>
  </div>
);
