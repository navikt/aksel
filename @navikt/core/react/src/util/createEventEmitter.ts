/**
 * Lightweight internal event emitter (string -> listeners).
 *
 * Usage:
 *   const emitter = createEventEmitter();
 *   const listener = (data) => { ... };
 *   emitter.on("ready", listener);
 *   emitter.emit("ready", { foo: 1 });
 *   emitter.off("ready", listener);
 *
 */
function createEventEmitter() {
  const map = new Map<string, Set<(data: any) => void>>();
  return {
    emit(event: string, data: any) {
      map.get(event)?.forEach((listener) => listener(data));
    },
    on(event: string, listener: (data: any) => void) {
      if (!map.has(event)) {
        map.set(event, new Set());
      }
      map.get(event)!.add(listener);
    },
    off(event: string, listener: (data: any) => void) {
      map.get(event)?.delete(listener);
    },
  };
}

export { createEventEmitter };
