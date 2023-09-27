import { BodyShort, Button } from "@navikt/ds-react";
import Link from "next/link";

function PreviewBanner({
  loading = true,
  validUser,
}: {
  loading: boolean;
  validUser: boolean;
}) {
  if (!validUser) {
    return (
      <>
        <div className="fixed inset-0 z-[9999] bg-gray-900/80 backdrop-blur-md" />
        <div className="text-text-on-inverted fixed top-0 z-[9999] grid w-full justify-center bg-gray-900 px-4 py-4 text-center font-semibold no-underline">
          <BodyShort spacing>
            Preview ikke tilgjengelig, finner ikke innlogget Sanity bruker.
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
            href="https://aksel.nav.no/god-praksis/artikler/ny-redaktor-i-aksel"
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
      className="text-text-on-inverted focus-visible:shadow-focus-inverted fixed left-0 top-2 z-[9999] w-80 -translate-x-24 translate-y-6 -rotate-45 bg-gray-900 p-4 text-center font-semibold no-underline hover:bg-gray-700 focus:outline-none"
    >
      {loading ? <span>LASTER PREVIEW...</span> : <span>EXIT PREVIEW</span>}
    </a>
  );
}

export default PreviewBanner;
