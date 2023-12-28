/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { createDescendantContext } from "./useDescendant";

export default {
  title: "System / Descendants / NumberInput",
};

const [
  DescendantsProvider,
  useDescendantsContext,
  useDescendants,
  useDescendant,
] = createDescendantContext<HTMLInputElement, { value?: string }>();

function NumberInput({ children }: { children?: React.ReactNode }) {
  const descendants = useDescendants();

  React.useEffect(() => {
    descendants.first()?.node.focus();
  }, [descendants]);

  return (
    <DescendantsProvider value={descendants}>{children}</DescendantsProvider>
  );
}

function Input() {
  const [focused, setFocused] = React.useState(false);
  const { register, index, descendants } = useDescendant();

  return (
    <input
      style={{
        width: 50,
        height: 50,
        background: "lightgray",
        margin: 5,
        borderRadius: "8px",
        textAlign: "center",
      }}
      placeholder={focused ? "" : "-"}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      ref={register}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          descendants.next(index)?.node.focus();
        }
        if (event.key === "ArrowLeft") {
          descendants.prev(index)?.node.focus();
        }
      }}
    />
  );
}

export const WithNumberInput = () => {
  return (
    <NumberInput>
      <Input />
      <Input />
      <Input />
    </NumberInput>
  );
};
