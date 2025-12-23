// https://github.com/chakra-ui/chakra-ui/tree/5ec0be610b5a69afba01a9c22365155c1b519136/packages/hooks/use-controllable-state
import { useState } from "react";
import { useEventCallback } from "./useEventCallback";

export interface UseControllableStateProps<T> {
  value?: T;
  defaultValue: T | (() => T);
  onChange?: (value: T) => void;
}

/**
 * `useControllableState` returns the state and function that updates the state, just like React.useState does.
 */
export function useControllableState<T>({
  value: valueProp,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>) {
  const onChangeProp = useEventCallback(onChange);

  const [uncontrolledState, setUncontrolledState] = useState(defaultValue);
  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : uncontrolledState;

  const setValue = useEventCallback((next: React.SetStateAction<T>) => {
    const setter = next as (prevState?: T) => T;
    const nextValue = typeof next === "function" ? setter(value) : next;

    if (!controlled) {
      setUncontrolledState(nextValue);
    }

    onChangeProp(nextValue);
  });

  return [value, setValue] as const;
}
