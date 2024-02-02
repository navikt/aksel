import * as React from "react";
import Floating from "./Floating";

export default {
  title: "Utilities/Floating",
  parameters: {
    chromatic: { disable: true },
  },
};

export const Styled = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Scrollable>
      <Floating>
        <Floating.Anchor className="anchor" onClick={() => setOpen(true)}>
          open
        </Floating.Anchor>

        {open && (
          <Floating.Content className="content" sideOffset={5}>
            <button onClick={() => setOpen(false)}>close</button>
            {/* <Popper.Arrow className={arrowClass()} width={20} height={10} /> */}
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
        transformOrigin: 'var(--ac-popper-transform-origin)';
        background-color: var(--a-gray-100);
        border-radius: var(--a-border-radius-large);
        width: 300px;
        height: 150px;
        display: grid;
        place-content: center;
      }

      .arrow{
        fill: var(--a-gray-100);
      }
      `}</style>
      {props?.children}
    </div>
  );
}
