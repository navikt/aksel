"use client";

import { format } from "date-fns";
import { useEffectEvent, useState } from "react";
import { DocumentActionComponent, useDocumentOperation } from "sanity";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  Button,
  HGrid,
  HStack,
  Heading,
  List,
  VStack,
} from "@navikt/ds-react";

type Steps = "1" | "2";

export function setLastVerified(
  originalAction: DocumentActionComponent,
): DocumentActionComponent {
  return (props) => {
    const originalResult = originalAction(props);
    const { patch } = useDocumentOperation(props.id, props.type);
    const [currentStep, setCurrentStep] = useState<Steps>("1");

    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = useEffectEvent(() => {
      setDialogOpen(true);
    });

    const closeDialog = useEffectEvent(() => {
      setDialogOpen(false);
      setCurrentStep("1");
    });

    const publishDocument = useEffectEvent((withNewVerify: boolean = false) => {
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
    });

    const handleContinue = useEffectEvent(() => {
      if (props.published) {
        setCurrentStep("2");
      } else {
        /* Sanity functions handles initial lastVerified timestamp creation */
        publishDocument(false);
      }
    });

    if (!originalResult) {
      return null;
    }

    return {
      ...originalResult,
      label: props.published ? "Publiser" : originalResult.label,
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
        <List.Item>Brukt riktig overskriftsnivå?</List.Item>
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
  onPublish: (withNewVerify: boolean) => void;
  lastVerified?: string;
};

function StepTwo(props: StepTwoProps) {
  const { onPublish, lastVerified } = props;

  return (
    <div>
      <VStack gap="space-8">
        <BodyLong>
          Hvis innholdet fortsatt er relevant og oppdatert, kan du velge å
          publisere med oppdatert godkjenningsdato. Hvis du derimot mener at
          innholdet trenger en gjennomgang, kan du publisere uten å oppdatere
          godkjenningsdatoen.
        </BodyLong>
        {lastVerified && (
          <BodyLong>
            Nåværende godkjenningsdato:{" "}
            <BodyLong as="strong" size="large" weight="semibold">
              {format(new Date(lastVerified), "dd.MM.yyyy")}
            </BodyLong>
          </BodyLong>
        )}
      </VStack>
      <HGrid gap="space-8" marginBlock="space-16 space-0">
        <Button variant="secondary" onClick={() => onPublish(false)}>
          Bruk eksisterende godkjenningsdato
        </Button>
        <Button onClick={() => onPublish(true)}>
          Oppdater godkjenningsdato
        </Button>
      </HGrid>
    </div>
  );
}
