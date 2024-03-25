import { useMemoObservable } from "react-rx";
import { SanityDocument, useDocumentStore, useFormValue } from "sanity";
import { FileFillIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";

type MetadataT = {
  title: string;
  explanation: string;
};

type InnholdstypeT = SanityDocument & MetadataT;

export function InnholdstypeHighlight(props) {
  const innholdstype = useFormValue(["innholdstype"]) as { _ref: string };

  const documentStore = useDocumentStore();
  const result: InnholdstypeT = useMemoObservable(() => {
    return documentStore.listenQuery(
      `*[_type == 'gp.innholdstype' && _id == $ref && !(_id in path("drafts.**"))][0]{...}`,
      { ref: innholdstype?._ref ?? "" },
      {},
    );
  }, [documentStore, innholdstype]);

  if (!result) {
    return props.renderDefault(props);
  }

  return (
    <div>
      <div>{props.renderDefault(props)}</div>
      <div className="mt-4 space-y-4">
        <div className="rounded-md bg-surface-subtle p-4 dark:bg-gray-900">
          <div className="inline-flex items-center gap-1 text-violet-700 dark:text-violet-300">
            <FileFillIcon aria-hidden fontSize="1rem" className="shrink-0" />
            <Heading level="3" size="small">
              {`${result.title} (innholdstype)`}
            </Heading>
          </div>
          {result.explanation && (
            <BodyLong className="mt-2">{result.explanation}</BodyLong>
          )}
        </div>
      </div>
    </div>
  );
}
