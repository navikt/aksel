import { useEffect, useRef } from "react";

/*
 * usePrevious hook
 * The ref object's "current" property is mutable and when changed wont re-render the component
 * meaning it can be used to stay "one render behind" the current state
 * https://usehooks.com/usePrevious/
 * https://blog.logrocket.com/accessing-previous-props-state-react-hooks/
 */

const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;
