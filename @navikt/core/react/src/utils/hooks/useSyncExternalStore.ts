import React, { useEffect, useState } from "react";

type UseSyncExternalStore = <T>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T,
) => T;

const maybeReactUseSyncExternalStore: UseSyncExternalStore | undefined = (
  React as any
)["useSyncExternalStore" + ""]; // Workaround for https://github.com/webpack/webpack/issues/14814

const useSyncExternalStoreShim: UseSyncExternalStore = (
  subscribe,
  getSnapshot,
) => {
  const [snapshot, setSnapshot] = useState(getSnapshot);

  useEffect(() => {
    const handleStoreChange = () => setSnapshot(getSnapshot);
    handleStoreChange();
    return subscribe(handleStoreChange);
  }, [subscribe, getSnapshot]);

  return snapshot;
};

const useSyncExternalStore: UseSyncExternalStore =
  maybeReactUseSyncExternalStore ?? useSyncExternalStoreShim;

export { useSyncExternalStore };
