import React from "react";
import { HStack } from "../../../layout/stack";
import { createDescendantContext } from "./useDescendant";

export default {
  title: "Utilities/Descendants",
  parameters: {
    chromatic: { disable: true },
  },
};

const [
  DescendantsProvider,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  _useDescendantsContext,
  useDescendants,
  useDescendant,
] = createDescendantContext<
  HTMLButtonElement | HTMLInputElement,
  { value?: string }
>();

function Select({ children }: { children?: React.ReactNode }) {
  const descendants = useDescendants();
  const count = descendants.count();

  // biome-ignore lint/correctness/useExhaustiveDependencies: We want count to be a trigger for focusing the last descendant here.
  React.useEffect(() => {
    descendants.last()?.node.focus();
  }, [descendants, count]);

  return (
    <DescendantsProvider value={descendants}>{children}</DescendantsProvider>
  );
}

function Option({ value, disabled }: { value?: string; disabled?: boolean }) {
  const { register, index, descendants } = useDescendant({
    disabled,
  });

  return (
    <button
      ref={register}
      tabIndex={0}
      data-value={value}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          descendants.next(index)?.node.focus();
        } else if (event.key === "ArrowUp") {
          descendants.prev(index)?.node.focus();
        }
      }}
    >
      Option {index + 1}
    </button>
  );
}

export const DynamicUpdates = () => {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => setDone((x) => !x), 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <Select>
      <Option value="option 1" />
      <div>
        <div>
          <Option value="option 2" />
          {done && (
            <div>
              <Option value="option 3" />
              <Option value="option 4" />
            </div>
          )}
        </div>
        <Option value="option 5" disabled />
      </div>
      {done && (
        <div>
          <Option value="option 6" />
          <Option value="option 7" />
        </div>
      )}
    </Select>
  );
};

function NumberInputWrapper({ children }: { children?: React.ReactNode }) {
  const descendants = useDescendants();

  React.useEffect(() => {
    descendants.first()?.node.focus();
  }, [descendants]);

  return (
    <DescendantsProvider value={descendants}>
      <HStack gap="1">{children}</HStack>
    </DescendantsProvider>
  );
}

function Input() {
  const [focused, setFocused] = React.useState(false);
  const { register, index, descendants } = useDescendant();

  return (
    <input
      style={{
        width: "3rem",
        height: "3rem",
        borderRadius: "4px",
        textAlign: "center",
        border: "1px solid var(--ax-border-neutral)",
      }}
      placeholder={focused ? "" : "0"}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      ref={register}
      type="tel"
      autoCapitalize="none"
      autoComplete="false"
      inputMode="numeric"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          descendants.next(index, false)?.node.focus();
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          descendants.prev(index, false)?.node.focus();
        }
      }}
    />
  );
}

export const NumberInput = () => {
  return (
    <NumberInputWrapper>
      <Input />
      <Input />
      <Input />
    </NumberInputWrapper>
  );
};
