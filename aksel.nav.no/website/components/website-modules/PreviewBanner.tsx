import Link from "next/link";
import { BodyShort, Button } from "@navikt/ds-react";
import { useSanityData } from "./SanityDataProvider";

function PreviewBanner({ loading = true }: { loading: boolean }) {
  const validUser = useSanityData()?.validUser;

  if (validUser === false) {
    return (
      <>
        <div className="fixed inset-0 z-[9999] bg-gray-900/80 backdrop-blur-md" />
        <div className="fixed top-0 z-[9999] grid w-full justify-center bg-gray-900 px-4 py-4 text-center font-semibold text-text-on-inverted no-underline">
          <BodyShort spacing>
            Preview ikke tilgjengelig, finner ikke innlogget Sanity-bruker.
          </BodyShort>

          <div data-theme="dark" className="mb-3 flex justify-center gap-2">
            <Button
              variant="primary"
              as="a"
              href="/studio"
              rel="noreferrer"
              target="_blank"
            >
              Logg inn
            </Button>
            <Button
              variant="secondary"
              as="a"
              href={`/api/exit-preview?slug=${window.location.pathname}`}
            >
              Exit preview
            </Button>
          </div>

          <Link
            href="https://aksel.nav.no/god-praksis/artikler/slik-publiserer-du-i-sanity"
            passHref
            className="underline"
          >
            Les mer om hvordan du får tilgang
          </Link>
        </div>
      </>
    );
  }

  return (
    <a
      href={`/api/exit-preview?slug=${window.location.pathname}`}
      className="fixed left-0 top-2 z-[9999] w-80 -translate-x-24 translate-y-6 -rotate-45 bg-gray-900 p-4 text-center font-semibold text-text-on-inverted no-underline hover:bg-gray-700 focus:outline-none focus-visible:shadow-focus-inverted"
    >
      {loading ? <span>LASTER PREVIEW...</span> : <span>EXIT PREVIEW</span>}
    </a>
  );
}

export default PreviewBanner;
