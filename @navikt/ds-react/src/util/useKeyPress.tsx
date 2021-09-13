import { useEffect } from "react";

enum Keys {
  Escape = "Escape",
  Tab = "Tab",
}
type KeyTypes = keyof typeof Keys;

export const useKeyPress = (
  key: KeyTypes,
  cb: (e: KeyboardEvent) => void
): void => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => e.key === key && cb(e);

    document.addEventListener("keydown", handleKeyPress, true);
    return () => {
      document.removeEventListener("keydown", handleKeyPress, true);
    };
  }, [key, cb]);
};
