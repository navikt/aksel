/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { Box } from "../../../layout/box";
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
  _useDescendantsContext,
  useDescendants,
  useDescendant,
] = createDescendantContext<HTMLDivElement, { value?: string }>();

function Select({ children }: { children?: React.ReactNode }) {
  const descendants = useDescendants();
  const count = descendants.count();

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
    <Box
      ref={register}
      role="button"
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
    </Box>
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
        <Option value="option 5" />
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
        border: "1px solid var(--a-border-default)",
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
          descendants.next(index, false)?.node.focus();
        }
        if (event.key === "ArrowLeft") {
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

const Comp = (props: any) => {
  return <div>abc</div>;
};

type asdasd = typeof Comp;
