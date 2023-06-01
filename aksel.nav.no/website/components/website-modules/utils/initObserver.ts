import {
  Faro,
  getWebInstrumentations,
  initializeFaro,
} from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

let faro: Faro | null = null;
export function initObserver(): void {
  if (typeof window === "undefined" || faro !== null) {
    return;
  }

  getFaro();
}

function getFaro(): Faro {
  if (faro !== null) {
    return faro;
  }
  faro = initializeFaro({
    url: "https://telemetry.ekstern.dev.nav.no/collect",
    app: {
      name: "aksel-nettside",
      version: "dev",
    },
    instrumentations: [
      ...getWebInstrumentations({
        captureConsole: false,
      }),
      new TracingInstrumentation(),
    ],
  });
  return faro;
}
