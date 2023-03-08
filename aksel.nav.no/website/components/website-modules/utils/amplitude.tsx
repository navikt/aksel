import amplitude from "amplitude-js";
import getConfig from "next/config";
import { Router } from "next/router";
import { useCallback, useEffect, useMemo } from "react";
const { publicRuntimeConfig } = getConfig();

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
  "søk" = "søk",
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

export type SearchLogT = {
  type: "suksess" | "feilet" | "standard";
  retries: number;
  retriedQueries: string[];
  query: string;
  filter: string[];
  hits: number;
  searchedFromUrl: string;

  index?: number;
  accuracy?: string;
  topResult?: boolean;
  url?: string;
};

export const logSearch = (data: SearchLogT) => {
  logAmplitudeEvent(AmplitudeEvents.søk, {
    ...data,
  });
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
const isProdUrl = () => window.location.host === "aksel.nav.no";

const isDevelopment = process.env.NODE_ENV === "development";
const isTest = publicRuntimeConfig?.NEXT_PUBLIC_TEST !== undefined;

const isProduction = () => {
  return !(isDevelopment || isTest || isPreview()) && isProdUrl();
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
  const pageId = useMemo(
    () => pageProps?.id || pageProps?.page?._id,
    [pageProps]
  );
  const isForside = useMemo(
    () => pageProps?.page?._type === "aksel_forside",
    [pageProps]
  );

  const logView = useCallback(
    (e, first = false) => {
      const data = {};
      try {
        if (pageProps?.page && pageProps.page?._type === "aksel_artikkel") {
          const tema = pageProps.page.tema.map((x) => x?.slug?.current) ?? null;
          if (tema && tema.length > 0) {
            data["tema"] = tema;
          }
        }
      } catch (error) {
        isDevelopment && console.error(error);
      }
      /* First might be an object */
      logPageView(e, data, first === true);
      try {
        if (isForside && isProduction() && !!pageId) {
          fetch(`/api/log-page-view?id=${pageId}`);
        }
      } catch (error) {
        isDevelopment && console.error(error);
      }
    },
    [pageProps, pageId, isForside]
  );

  const logScroll = useCallback(
    (highestPercent: number) => {
      highestPercent > 100 && (highestPercent = 100);
      if (
        document === undefined ||
        window?.location?.pathname?.startsWith?.("/eksempler")
      ) {
        return;
      }

      if (isNaN(highestPercent)) {
        return;
      }

      logAmplitudeEvent(AmplitudeEvents.scroll, {
        side: window.location.pathname,
        prosent: highestPercent,
      });
      try {
        if (isForside && isProduction() && !!pageId) {
          fetch(`/api/log-scroll?id=${pageId}&length=${highestPercent}`);
        }
      } catch (error) {
        isDevelopment && console.error(error);
      }
    },
    [pageId, isForside]
  );

  const logTimeSpent = useCallback(
    (timeSpent: number) => {
      try {
        if (isForside && timeSpent <= 420 && isProduction() && !!pageId) {
          fetch(`/api/log-time?id=${pageId}&time=${timeSpent}`);
        }
      } catch (error) {
        isDevelopment && console.error(error);
      }
    },
    [pageId, isForside]
  );

  useEffect(() => {
    const startTime = new Date().getTime();

    let highestPercent = 0;
    let timeoutId = null;
    const footer = document.querySelector("#aksel-footer") as HTMLElement;

    //get highest scroll percent
    function scrollListener() {
      timeoutId = setTimeout(() => {
        const currentPercent = Math.round(
          (window.pageYOffset /
            (document.body.scrollHeight -
              window.innerHeight -
              (footer ? footer.offsetHeight : 0))) *
            100
        );
        if (currentPercent > highestPercent) {
          highestPercent = currentPercent;
          clearTimeout(timeoutId);
        }
      }, 500);
    }

    window.addEventListener("scroll", scrollListener);

    router.events.on("routeChangeComplete", logView);
    router.events.on("routeChangeStart", logScroll);
    window.onload = () => logView(window.location.pathname, true);

    return () => {
      router.events.off("routeChangeComplete", logView);
      router.events.off("routeChangeStart", logScroll);
      window.removeEventListener("scroll", scrollListener);

      if (isForside) {
        logTimeSpent(Math.round((new Date().getTime() - startTime) / 1000));
        logScroll(highestPercent);
      }
    };
  }, [router.events, logView, logScroll, logTimeSpent, isForside]);
};
