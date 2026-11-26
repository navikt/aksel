import { endOfDay } from "date-fns/endOfDay";
import { startOfDay } from "date-fns/startOfDay";
import { subDays } from "date-fns/subDays";
import { useMemo, useState } from "react";
import { CheckmarkIcon, FilesIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  Box,
  Button,
  DatePicker,
  HStack,
  InlineMessage,
  Textarea,
  VStack,
  useRangeDatepicker,
} from "@navikt/ds-react";
import { formatSlackMessage, toSlackHtml } from "./format-slack-message";
import {
  type QueryDateRangeT,
  useBuildNewsletterEntries,
} from "./useBuildNewsletterEntries";

export const NewsletterSlackView = () => {
  const [initialRange] = useState(() => ({
    from: subDays(startOfDay(new Date()), 7),
    to: new Date(),
  }));
  const { datepickerProps, fromInputProps, toInputProps, selectedRange } =
    useRangeDatepicker({ defaultSelected: initialRange });

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

  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copied" | "copiedAsPlainText" | "error"
  >("idle");

  const copyAsRichText = async () => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([toSlackHtml(text)], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      // Some browsers don't support ClipboardItem or deny rich-text write
      try {
        await navigator.clipboard.writeText(text);
        setCopyStatus("copiedAsPlainText");
      } catch {
        setCopyStatus("error");
      }
    }
  };

  return (
    <Box padding="space-24" maxWidth="60rem">
      <VStack gap="space-24">
        <BodyLong>
          Samler nye artikler og endringslogg-innlegg for perioden. Rediger
          teksten og kopier den inn i Slack.
        </BodyLong>
        <DatePicker {...datepickerProps}>
          <HStack wrap gap="space-16">
            <DatePicker.Input {...fromInputProps} label="Fra" />
            <DatePicker.Input {...toInputProps} label="Til" />
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
            readOnly={status === "loading"}
          />
        )}

        <HStack gap="space-8" align="center">
          <Button
            size="small"
            icon={
              copyStatus === "copied" ? (
                <CheckmarkIcon aria-hidden />
              ) : (
                <FilesIcon aria-hidden />
              )
            }
            onClick={copyAsRichText}
            disabled={!text}
          >
            {copyStatus === "copied" ? "Kopiert!" : "Kopier tekst"}
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => setText(generatedText)}
            disabled={text === generatedText}
          >
            Tilbakestill tekst
          </Button>
        </HStack>
        {copyStatus === "copiedAsPlainText" && (
          <InlineMessage status="warning">
            Kopierte som ren tekst. Lenkene blir ikke klikkbare i Slack.
          </InlineMessage>
        )}
        {copyStatus === "error" && (
          <InlineMessage status="error">
            Klarte ikke å kopiere. Kopier teksten manuelt.
          </InlineMessage>
        )}
      </VStack>
    </Box>
  );
};
