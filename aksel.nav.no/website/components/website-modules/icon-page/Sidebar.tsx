import * as Icons from "@navikt/aksel-icons";
import meta from "@navikt/aksel-icons/metadata";
import { Button, Heading } from "@navikt/ds-react";
import Snippet from "components/sanity-modules/code/Snippet";
import { SuggestionBlock } from "components/website-modules/suggestionblock";
import {
  AmplitudeEvents,
  logAmplitudeEvent,
} from "components/website-modules/utils/amplitude";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

export const IconSidebar = ({
  name,
  focusRef,
}: {
  name: string;
  focusRef: any;
}) => {
  const SelectedIcon = Icons[`${name}Icon`];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [blob, setBlob]: any = useState();
  const router = useRouter();

  const currentIcon = useMemo(
    () => Object.values(meta).find((x) => x.name === name),
    [name]
  );

  useEffect(() => {
    if (!name) return;
    getBlob(name);
  }, [name]);

  async function getBlob(icon: string) {
    const iconUrl = `https://raw.githubusercontent.com/navikt/aksel/main/%40navikt/aksel-icons/icons/${icon}.svg`;
    fetch(iconUrl)
      .then((r) => {
        return r.text();
      })
      .then((r) => {
        setBlob(new Blob([r], { type: "image/svg+xml" }));
      });
  }

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.focus({ preventScroll: true });
    }
  }, [name]);

  const logDownload = (icon, format) => {
    logAmplitudeEvent(AmplitudeEvents.ikonnedlastning, {
      icon,
      format,
    });
  };

  const escape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        router.push("/ikoner", undefined, { shallow: true });
        focusRef?.current?.focus?.();
      }
    },
    [focusRef, router]
  );

  useEffect(() => {
    window.addEventListener("keydown", escape, false);

    return () => {
      window.removeEventListener("keydown", escape, false);
    };
  }, [escape]);

  return (
    <section
      ref={wrapperRef}
      className="animate-fadeIn min-h-96 h-fit w-full basis-1/3 py-8 focus:outline-none sm:px-6 lg:sticky lg:top-16"
      tabIndex={-1}
      aria-labelledby="icon-details"
    >
      <Link
        href="/ikoner"
        scroll={false}
        prefetch={false}
        className="min-h-11 hover:bg-surface-hover focus-visible:shadow-focus active:bg-surface-neutral-subtle-hover absolute right-2 top-4 grid aspect-square place-content-center rounded text-xl focus:outline-none"
        onClick={() => {
          focusRef?.current?.focus?.();
        }}
      >
        <Icons.XMarkIcon fontSize="1.5rem" title="lukk ikondetaljer" />
      </Link>

      <div className="text-5xl">
        <SelectedIcon aria-hidden />
      </div>
      <Heading
        level="2"
        size="medium"
        className="mt-3 scroll-m-20"
        id="icon-details"
      >
        {`${name}Icon`}
      </Heading>
      <div>
        <span className="navds-sr-only">kategorier</span>
        <p className="mt-1">{currentIcon.category}</p>
        <p>
          <span aria-hidden>└ </span>
          {`${currentIcon.sub_category}`}
        </p>
      </div>
      <Button
        variant="primary"
        className="mt-8 w-full"
        as="a"
        onClick={() => {
          logDownload(name, "svg");
        }}
        href={blob ? URL.createObjectURL(blob) : "#"}
        download={name}
      >
        Last ned
      </Button>
      <div className="mt-6 max-w-md">
        <Snippet
          node={{
            title: "Import",
            code: {
              code: `import { ${name}Icon } from '@navikt/aksel-icons';`,
              language: "jsx",
            },
          }}
        />

        <Snippet
          node={{
            title: "React",
            code: {
              code: `<${name}Icon title="a11y-title" fontSize="1.5rem" />`,
              language: "jsx",
            },
          }}
        />

        <Snippet
          node={{
            title: "SVG",
            code: {
              code: ReactDOMServer.renderToString(<SelectedIcon />),
              language: "jsx",
            },
          }}
        />

        <div>
          <SuggestionBlock variant="ikon" reference={name} />
        </div>
      </div>
    </section>
  );
};
