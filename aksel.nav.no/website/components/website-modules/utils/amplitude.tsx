import amplitude from "amplitude-js";
import { Router } from "next/router";
import { useCallback, useEffect } from "react";

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
  "scroll" = "scroll",
}

export const initAmplitude = () => {
  if (amplitude && !(typeof window === "undefined")) {
    amplitude.getInstance().init("default", "", {
      apiEndpoint: "amplitude.nav.no/collect-auto",
      saveEvents: false,
      includeUtm: true,
      includeReferrer: true,
      platform: window.location.toString(),
    });
  }
};

const logPageView = (s: string, data: any = {}, firstLoad?: boolean) => {
  logAmplitudeEvent(AmplitudeEvents.sidevisning, {
    side: s,
    firstLoad: !!firstLoad,
    ...data,
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

const isProduction = () => {
  return !(isDevelopment || isTest || isPreview());
};

export function logAmplitudeEvent(eventName: string, data?: any): Promise<any> {
  return new Promise(function (resolve: any) {
    const eventData = data ? { ...data } : {};
    if (amplitude && isProduction()) {
      amplitude.getInstance().logEvent(eventName, eventData, resolve);
    }
  });
}

export const usePageView = (router: Router, pageProps: any) => {
  const pageId = pageProps?.id || pageProps?.page?._id;

  const isForside = pageProps?.page?._type === "aksel_forside";

  const logView = useCallback(
    (e, first = false) => {
      const data = {};
      try {
        if (pageProps?.page && pageProps.page?._type === "aksel_artikkel") {
          data["tema"] = pageProps.page.tema.map((x) => x?.slug?.current);
        }
      } catch (error) {
        isDevelopment && console.error(error);
      }
      logPageView(e, data, first);
      try {
        if (isProduction && isForside) {
          fetch(`/api/log-page-view?id=${pageId}`);
        }
      } catch (error) {
        isDevelopment && console.error(error);
      }
    },
    [pageProps, pageId, isForside]
  );

  /* https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript */
  const logScroll = useCallback(() => {
    function getScrollPercent() {
      const h = document.documentElement,
        b = document.body,
        st = "scrollTop",
        sh = "scrollHeight";
      return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    }
    if (
      document === undefined ||
      window?.location?.pathname?.startsWith?.("/eksempler")
    ) {
      return;
    }

    const scrollD = Math.round(getScrollPercent() / 10) * 10;
    if (isNaN(scrollD)) {
      return;
    }

    logAmplitudeEvent(AmplitudeEvents.scroll, {
      side: window.location.pathname,
      prosent: scrollD,
    });

    try {
      if (isProduction() && isForside) {
        fetch(`/api/log-scroll?id=${pageId}&length=${scrollD}`);
      }
    } catch (error) {
      isDevelopment && console.error(error);
    }
  }, [pageId, isForside]);

  const logTimeSpent = useCallback(
    (timeSpent: number) => {
      try {
        if (isProduction() && isForside) {
          const { metrics } = pageProps.page;

          fetch(
            `/api/log-time?id=${pageId}&current=${
              metrics?.avgTime || 0
            }&views=${metrics?.pageviews?.summary || 1}&time=${timeSpent}`
          );
        }
      } catch (error) {
        isDevelopment && console.error(error);
      }
    },
    [pageProps, pageId, isForside]
  );

  useEffect(() => {
    const startTime = new Date().getTime();

    router.events.on("routeChangeComplete", logView);
    router.events.on("routeChangeStart", logScroll);
    window.onload = () => logView(window.location.pathname, true);
    window.onbeforeunload = () => logScroll();

    return () => {
      router.events.off("routeChangeComplete", logView);
      router.events.off("routeChangeStart", logScroll);
      if (isForside) {
        logTimeSpent(Math.round((new Date().getTime() - startTime) / 1000));
      }
    };
  }, [router.events, logView, logScroll, logTimeSpent, isForside]);
};
