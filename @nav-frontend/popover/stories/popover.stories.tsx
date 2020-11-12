import React, {
  createRef,
  MutableRefObject,
  useRef,
  useState,
  useCallback,
} from "react";
import Popover from "../src/index";
import { Meta } from "@storybook/react/types-6-0";
import Knapp from "nav-frontend-knapper";
export default {
  title: "@nav-frontend/popover",
  component: Popover,
} as Meta;

const Template = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef();
  const testRef = useRef(null);

  const onClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button onClick={() => testRef.current.focus()}>
        Denne knappen setter fokus
      </button>
      <button ref={anchorRef} onClick={() => setOpen(true)}>
        Dette er en stor knapp
      </button>
      <Popover
        ref={testRef}
        open={open}
        anchorEl={anchorRef.current}
        onClose={onClose}
      >
        <Knapp type="fare">Dette er en kna0p</Knapp>
      </Popover>
    </>
  );
};

export const All = () => {
  return (
    <div
      style={{
        width: "450px",
        height: "250px",
        overflowY: "scroll",
        resize: "both",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "600px",
          margin: "auto",
          marginTop: "70%",
          overscrollBehavior: "contain",
        }}
      >
        <Template />
      </div>
    </div>
  );
};
