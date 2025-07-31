import { useMemoObservable } from "react-rx";
import { SanityDocument, useDocumentStore, useFormValue } from "sanity";
import { FileFillIcon } from "@navikt/aksel-icons";
import { BodyLong, BoxNew, HStack, Heading } from "@navikt/ds-react";

type MetadataT = {
  title: string;
  description: string;
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
      <BoxNew
        background="neutral-soft"
        borderWidth="1"
        borderColor="neutral-subtleA"
        borderRadius="medium"
        padding="space-16"
        marginBlock="space-4 space-0"
      >
        <HStack gap="space-4" marginBlock="space-0 space-4" align="center">
          <FileFillIcon aria-hidden fontSize="1.25rem" />
          <Heading level="3" size="small">
            {`${result.title} (innholdstype)`}
          </Heading>
        </HStack>
        {result.description && <BodyLong>{result.description}</BodyLong>}
      </BoxNew>
    </div>
  );
}
