import amplitude from "amplitude-js";

export enum AmplitudeEvents {
  "sidevisning" = "sidevisning",
  "navigasjon" = "navigasjon",
  "notfound" = "notfound",
  "error" = "error",
  "ikonklikk" = "ikonklikk",
  "ikonsok" = "ikonsok",
  "fargeklikk" = "fargeklikk",
  "ikonnedlastning" = "ikonnedlastning",
  "feedbackinteraksjon" = "feedbackinteraksjon",
}

export const initAmplitude = () => {
  if (amplitude) {
    amplitude.getInstance().init("default", "", {
      apiEndpoint: "amplitude.nav.no/collect-auto",
      saveEvents: false,
      includeUtm: true,
      includeReferrer: true,
      platform: window.location.toString(),
    });
  }
};

export const logPageView = (s: string, firstLoad?: boolean) => {
  logAmplitudeEvent(AmplitudeEvents.sidevisning, {
    side: s,
    firstLoad: !!firstLoad,
  });
};

export const logNav = (kilde: string, fra: string, til: string) => {
  logAmplitudeEvent(AmplitudeEvents.navigasjon, {
    kilde,
    fra,
    til,
  });
};

const isPreview = () => !!document.getElementById("exit-preview-id");

const isDevelopment = process.env.NODE_ENV === "development";
const isTest = process.env.NEXT_PUBLIC_TEST === "true";

export function logAmplitudeEvent(eventName: string, data?: any): Promise<any> {
  return new Promise(function (resolve: any) {
    const eventData = data ? { ...data } : {};
    if (amplitude && !(isDevelopment || isTest || isPreview())) {
      amplitude.getInstance().logEvent(eventName, eventData, resolve);
    }
  });
}
