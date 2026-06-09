"use client";

import { format } from "date-fns";
import { useMemo, useState } from "react";
import { DocumentActionComponent, useDocumentOperation } from "sanity";
import { useIntentLink } from "sanity/router";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  Box,
  Button,
  Checkbox,
  HGrid,
  HStack,
  Heading,
  List,
  VStack,
} from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";

type Steps = "1" | "2";

export function setLastVerified(
  originalAction: DocumentActionComponent,
): DocumentActionComponent {
  return (props) => {
    const originalResult = originalAction(props);
    const { patch } = useDocumentOperation(props.id, props.type);
    const [currentStep, setCurrentStep] = useState<Steps>("1");

    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => setDialogOpen(true);

    const closeDialog = () => {
      setDialogOpen(false);
      setCurrentStep("1");
    };

    const publishDocument = ({
      withNewVerify = false,
    }: { withNewVerify?: boolean } = {}) => {
      closeDialog();
      if (withNewVerify) {
        patch.execute([
          {
            set: {
              "updateInfo.lastVerified": format(new Date(), "yyyy-MM-dd"),
            },
          },
        ]);
      }
      originalResult?.onHandle?.();
    };

    const handleContinue = () => {
      if (props.published) {
        setCurrentStep("2");
      } else {
        /* Sanity functions handles initial lastVerified timestamp creation */
        publishDocument({ withNewVerify: false });
      }
    };

    if (!originalResult) {
      return null;
    }

    return {
      ...originalResult,
      onHandle: openDialog,
      dialog: isDialogOpen && {
        header: (
          <Heading level="2" size="medium">
            {currentStep === "1"
              ? "Huskeliste før publisering"
              : "Publiser artikkel"}
          </Heading>
        ),
        onClose: closeDialog,
        content:
          currentStep === "1" ? (
            <StepOne
              onCancel={closeDialog}
              onContinue={handleContinue}
              isPublished={!!props.published}
            />
          ) : (
            <StepTwo
              onPublish={publishDocument}
              lastVerified={
                (props.draft as any)?.updateInfo?.lastVerified ??
                (props.published as any)?.updateInfo?.lastVerified
              }
              id={props.id}
              docType={props.type}
            />
          ),
      },
    };
  };
}

type StepOneProps = {
  onContinue: () => void;
  onCancel: () => void;
  isPublished: boolean;
};

function StepOne(props: StepOneProps) {
  const { onContinue, onCancel, isPublished = false } = props;

  return (
    <div>
      <List>
        <List.Item>
          Brukt et aktivt og forståelig språk? Og ellers skrevet i tråd med slik
          vi skriver på Aksel?
        </List.Item>
        <List.Item>Fått noen til å lese over teksten din?</List.Item>
        <List.Item>
          Gitt leseren relevante veier videre til annet innhold, og skrevet gode
          lenketekster?
        </List.Item>
        <List.Item>
          Sørget for at det ikke ligger noe taushetsbelagt informasjon i
          artikkelen?
        </List.Item>
      </List>
      <HStack justify="end" gap="space-8" marginBlock="space-8 space-0">
        <Button onClick={onCancel} variant="secondary">
          Jeg vil endre noe først
        </Button>
        {isPublished ? (
          <Button
            onClick={onContinue}
            iconPosition="right"
            icon={<ChevronRightIcon aria-hidden />}
          >
            Fortsett
          </Button>
        ) : (
          <Button onClick={onContinue}>Publiser</Button>
        )}
      </HStack>
    </div>
  );
}

type StepTwoProps = {
  onPublish: (options?: { withNewVerify?: boolean }) => void;
  lastVerified?: string;
  id: string;
  docType: string;
};

function StepTwo(props: StepTwoProps) {
  const { onPublish, lastVerified } = props;
  const [formState, setFormState] = useState({
    updateDate: props.docType === "aksel-artikkel",
    newChangeLog: props.docType === "aksel-artikkel",
  });

  const publishWithChangelog = formState.updateDate && formState.newChangeLog;

  return (
    <div>
      <VStack gap="space-16">
        <BodyLong>
          Dersom artikkelen inneholder betydelige endringer, bør du vurdere om
          disse skal beskrives i endringsloggen. Det gjelder blant annet:
        </BodyLong>
        <List>
          <ListItem>
            endringer i praksis / komponent som brukerne bør informeres om
          </ListItem>
          <ListItem>
            endringer som er nyttige å loggføre for vår egen oversikt
          </ListItem>
        </List>
        {lastVerified && (
          <BodyLong>
            Nåværende godkjenningsdato:{" "}
            <BodyLong as="strong" size="large" weight="semibold">
              {format(new Date(lastVerified), "dd.MM.yyyy")}
            </BodyLong>
          </BodyLong>
        )}
      </VStack>
      <VStack marginBlock="space-16">
        <Checkbox
          value="update-date"
          checked={formState.updateDate}
          onChange={() => {
            setFormState({
              updateDate: !formState.updateDate,
              newChangeLog: !formState.updateDate,
            });
          }}
        >
          Oppdater godkjenningsdato
        </Checkbox>
        <Box marginInline="space-24 space-0">
          <Checkbox
            value="new-change-log"
            checked={formState.newChangeLog}
            disabled={!formState.updateDate}
            onChange={() =>
              setFormState({
                ...formState,
                newChangeLog: !formState.newChangeLog,
              })
            }
          >
            Lag nytt endringsinnlegg ved publisering
          </Checkbox>
        </Box>
      </VStack>
      <HGrid marginBlock="space-16 space-0">
        {publishWithChangelog ? (
          <PublishAndCreateChangelog
            id={props.id}
            docType={props.docType}
            onClick={() =>
              onPublish({
                withNewVerify: formState.updateDate,
              })
            }
          />
        ) : (
          <Button
            onClick={() =>
              onPublish({
                withNewVerify: formState.updateDate,
              })
            }
          >
            Publiser
          </Button>
        )}
      </HGrid>
    </div>
  );
}

type PublishAndCreateChangelogProps = {
  id: string;
  onClick?: () => void;
  docType: string;
};

/**
 * Note that we need to open in new tab so that original document finishes publishing.
 */
function PublishAndCreateChangelog({
  id,
  onClick: onClickProp,
  docType,
}: PublishAndCreateChangelogProps) {
  const cleanedId = useMemo(() => {
    const split = id.split(".");
    return split[split.length - 1];
  }, [id]);

  const { href, onClick } = useIntentLink({
    intent: "create",
    params: [getIntentFromDocType(docType), { id: cleanedId }],
    target: "_blank",
    onClick: onClickProp,
  });

  return (
    <Button
      as="a"
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      Publiser
    </Button>
  );
}

function getIntentFromDocType(docType: string) {
  switch (docType) {
    case "ds_artikkel":
    case "komponent_artikkel":
    case "templates_artikkel":
      return {
        type: "ds_endringslogg_artikkel",
        template: "ds.changelog.with.reference",
      };
    default:
      return {
        type: "gp_endringslogg_artikkel",
        template: "gp.changelog.with.reference",
      };
  }
}
