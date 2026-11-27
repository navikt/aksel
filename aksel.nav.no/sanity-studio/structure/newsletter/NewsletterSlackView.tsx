import { endOfDay } from "date-fns/endOfDay";
import { startOfDay } from "date-fns/startOfDay";
import { subDays } from "date-fns/subDays";
import { useMemo, useState } from "react";
import {
  BodyLong,
  Box,
  Button,
  DatePicker,
  HStack,
  InlineMessage,
  type RangeValidationT,
  Textarea,
  VStack,
  useRangeDatepicker,
} from "@navikt/ds-react";
import { CopyForSlackButton } from "./CopyForSlackButton";
import { PostToSlackButton } from "./PostToSlackButton";
import type { FeedbackT } from "./feedback";
import { formatSlackMessage } from "./format-slack-message";
import {
  type QueryDateRangeT,
  useBuildNewsletterEntries,
} from "./useBuildNewsletterEntries";

export const NewsletterSlackView = () => {
  const [validation, setValidation] = useState<RangeValidationT>();
  const [initialRange] = useState(() => ({
    from: subDays(startOfDay(new Date()), 6),
    to: new Date(),
  }));
  const { datepickerProps, fromInputProps, toInputProps, selectedRange } =
    useRangeDatepicker({
      defaultSelected: initialRange,
      onValidate: setValidation,
    });

  const range = useMemo<QueryDateRangeT | undefined>(
    () =>
      selectedRange?.from && selectedRange.to
        ? {
            from: selectedRange.from,
            to: endOfDay(selectedRange.to),
          }
        : undefined,
    [selectedRange],
  );
  const { status, entries } = useBuildNewsletterEntries(range);

  const generatedText = useMemo(
    () => (range && entries ? formatSlackMessage(entries, range) : ""),
    [range, entries],
  );

  /* Edits are tied to the text they were made on, so a new period resets them */
  const [edit, setEdit] = useState<{ base: string; text: string }>();
  const text = edit?.base === generatedText ? edit.text : generatedText;
  const setText = (value: string) =>
    setEdit({ base: generatedText, text: value });

  const [feedback, setFeedback] = useState<FeedbackT>(null);

  return (
    <Box padding="space-24" maxWidth="60rem">
      <VStack gap="space-24">
        <BodyLong>
          Samler nye artikler og endringslogg-innlegg for valgt periode. Rediger
          teksten og kopier den inn i Slack, eller legg den ut direkte.
        </BodyLong>
        <DatePicker {...datepickerProps}>
          <HStack wrap gap="space-16">
            <DatePicker.Input
              {...fromInputProps}
              label="Fra"
              error={validation && getDateError(validation.from)}
            />
            <DatePicker.Input
              {...toInputProps}
              label="Til"
              error={validation && getDateError(validation.to)}
            />
          </HStack>
        </DatePicker>

        {status === "error" ? (
          <InlineMessage status="error">
            Klarte ikke å hente innhold for perioden.
          </InlineMessage>
        ) : (
          <Textarea
            label="Melding"
            description="Teksten kan redigeres før du kopierer den. Lenker skrives som [tekst](url) og blir klikkbare i Slack."
            value={text}
            onChange={(event) => setText(event.target.value)}
            minRows={16}
            readOnly={status !== "ready"}
          />
        )}
        <HStack gap="space-8" align="center" wrap>
          <PostToSlackButton text={text} onFeedback={setFeedback} />
          <CopyForSlackButton text={text} onFeedback={setFeedback} />
          <Button
            variant="secondary"
            size="small"
            onClick={() => setText(generatedText)}
            disabled={text === generatedText}
          >
            Tilbakestill tekst
          </Button>
        </HStack>
        {/* Always mounted, so screen readers announce messages when they appear */}
        <div aria-live="polite">
          {feedback && (
            <InlineMessage status={feedback.status}>
              {feedback.message}
            </InlineMessage>
          )}
        </div>
      </VStack>
    </Box>
  );
};

const getDateError = (validation: RangeValidationT["to"]) => {
  if (validation.isEmpty) {
    return "Velg en dato.";
  }
  if (validation.isInvalid) {
    return "Ugyldig dato. Bruk formatet dd.mm.åååå.";
  }
  if (validation.isBeforeFrom) {
    return "Til-datoen kan ikke være før fra-datoen.";
  }
  return undefined;
};
