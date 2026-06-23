// https://github.com/chakra-ui/chakra-ui/tree/5ec0be610b5a69afba01a9c22365155c1b519136/packages/hooks/use-controllable-state
import { useState } from "react";
import { useEventCallback } from "./useEventCallback";

export interface UseControllableStateProps<
  StateT,
  ChangeT extends StateT = StateT,
> {
  value?: StateT;
  defaultValue: StateT | (() => StateT);
  onChange?: (value: ChangeT) => void;
}

/**
 * `useControllableState` returns the state and function that updates the state, just like React.useState does.
 */
export function useControllableState<StateT, ChangeT extends StateT = StateT>({
  value: valueProp,
  defaultValue,
  onChange,
}: UseControllableStateProps<StateT, ChangeT>) {
  const onChangeProp = useEventCallback(onChange);

  const [uncontrolledState, setUncontrolledState] = useState(defaultValue);
  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : uncontrolledState;

  const setValue = useEventCallback(
    (next: ChangeT | ((prevState: StateT) => ChangeT)) => {
      const setter = next as (prevState?: StateT) => ChangeT;
      const nextValue = typeof next === "function" ? setter(value) : next;

      if (!controlled) {
        setUncontrolledState(nextValue);
      }

      onChangeProp(nextValue);
    },
  );

  return [value, setValue] as const;
}
