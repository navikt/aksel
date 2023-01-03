import { BodyShort, Button, Heading, Label, Textarea } from "@navikt/ds-react";
import cl from "clsx";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FeedbackT, HelpfulArticleEnum } from "@/lib";
import { AmplitudeEvents, IdContext, logAmplitudeEvent } from "../utils";

const Feedback = ({
  docId,
  docType,
  center,
  akselFeedback = false,
  text,
}: {
  docId?: string;
  docType?: string;
  center?: boolean;
  akselFeedback?: boolean;
  text?: string;
}): JSX.Element => {
  const idCtx = useContext(IdContext);
  const { asPath, basePath } = useRouter();
  const [textValue, setTextValue] = useState("");
  const [activeState, setActiveState] = useState<HelpfulArticleEnum | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const timeoutTimer = useRef<number | null>();
  const [thanksFeedback, setThanksFeedback] = useState<boolean>(false);
  const textAreaRef = useRef(null);
  const [hasLoggedFeedback, setHasLoggedFeedback] = useState(false);

  const fetchFeedback = () => {
    const state = {
      ja: "ja",
      nei: "nei",
      misc: "forslag",
    };

    const body: FeedbackT = {
      message: textValue,
      url: `${basePath}${asPath}`,
      type: state[activeState],
      docId: idCtx?.id,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const logFeedback = useCallback(
    (completed: boolean) => {
      !hasLoggedFeedback &&
        activeState &&
        logAmplitudeEvent(AmplitudeEvents.feedbackinteraksjon, {
          fra: asPath,
          vamd: activeState,
          completed,
        });
    },
    [asPath, activeState, hasLoggedFeedback]
  );

  useEffect(() => {
    const callLogFeedback = () => logFeedback(false);

    window.addEventListener("beforeunload", callLogFeedback);
    return () => {
      window.removeEventListener("beforeunload", callLogFeedback);
    };
  }, [logFeedback]);

  const handleSend = (e) => {
    e.preventDefault();

    if (!(activeState === HelpfulArticleEnum.JA) && textValue === "") {
      setErrorMsg(
        "Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet."
      );
      return;
    }
    setErrorMsg(null);

    fetchFeedback();

    logFeedback(true);
    setHasLoggedFeedback(true);

    setActiveState(null);
    setTextValue("");
    setThanksFeedback(true);
    timeoutTimer.current = window.setTimeout(() => {
      setThanksFeedback(false);
    }, 3000);

    return () => {
      if (timeoutTimer.current) {
        window.clearTimeout(timeoutTimer.current);
        timeoutTimer.current = null;
      }
    };
  };

  useEffect(() => {
    textValue && errorMsg && setErrorMsg(null);
  }, [textValue, errorMsg]);

  useEffect(() => {
    if (timeoutTimer.current && activeState) {
      setThanksFeedback(false);
      window.clearTimeout(timeoutTimer.current);
      timeoutTimer.current = null;
    }
  }, [activeState]);

  useEffect(() => {
    activeState && textAreaRef.current && textAreaRef.current.focus();
    setErrorMsg(null);
  }, [activeState]);

  useEffect(() => {
    setActiveState(null);
    setTextValue("");
    setThanksFeedback(false);

    if (timeoutTimer.current) {
      window.clearTimeout(timeoutTimer.current);
      timeoutTimer.current = null;
    }
  }, [asPath]);

  const getPlaceholder = () => {
    switch (activeState) {
      case HelpfulArticleEnum.JA:
        return "Er det noe du vil trekke frem? (valgfritt)";
      case HelpfulArticleEnum.DELVIS:
        return "Hva er det som mangler?";
      case HelpfulArticleEnum.NEI:
        return "Hva er det du ikke liker?";
      case HelpfulArticleEnum.MISC:
        return "Hva kan forbedres?";
      default:
        return "Hva kan forbedres?";
    }
  };

  if (!docId || !docType) return null;

  const classes = akselFeedback
    ? "algolia-ignore-index scroll-my-[30vh]"
    : cl("scroll-my-[30vh] algolia-ignore-index mt-44 mb-28", {
        "mx-auto": center,
      });

  return (
    <div className={classes} id="feedback-block" data-hj-suppress>
      <div
        className={cl("flex w-full flex-col gap-4", {
          "": akselFeedback,
          "items-center": center,
        })}
      >
        <Heading
          size="small"
          level="2"
          className={cl({ "text-deepblue-700": akselFeedback })}
        >
          Var denne {`${text ?? "artikkelen"}`} til hjelp?
        </Heading>
        <div
          className={cl("flex w-full gap-4", {
            "override-secondary-button justify-start": akselFeedback,
            "justify-center": center,
          })}
        >
          <Button
            variant="secondary"
            className={cl({
              "override-secondary-button-active bg-deepblue-800 text-text-on-inverted ring-deepblue-800 focus-visible:shadow-focus ring-2 ring-inset focus-visible:ring-1 focus-visible:ring-white":
                activeState === HelpfulArticleEnum.JA,
            })}
            onClick={() =>
              setActiveState((x) =>
                x === HelpfulArticleEnum.JA ? null : HelpfulArticleEnum.JA
              )
            }
          >
            <Label as="span">Ja</Label>
          </Button>
          <Button
            variant="secondary"
            className={cl({
              "override-secondary-button-active bg-deepblue-800 text-text-on-inverted ring-deepblue-800 focus-visible:shadow-focus ring-2 ring-inset focus-visible:ring-1 focus-visible:ring-white":
                activeState === HelpfulArticleEnum.NEI,
            })}
            onClick={() =>
              setActiveState((x) =>
                x === HelpfulArticleEnum.NEI ? null : HelpfulArticleEnum.NEI
              )
            }
          >
            <Label as="span">Nei</Label>
          </Button>
          <Button
            variant="secondary"
            className={cl({
              "override-secondary-button-active bg-deepblue-800 text-text-on-inverted ring-deepblue-800 focus-visible:shadow-focus ring-2 ring-inset focus-visible:ring-1 focus-visible:ring-white":
                activeState === HelpfulArticleEnum.MISC,
            })}
            onClick={() =>
              setActiveState((x) =>
                x === HelpfulArticleEnum.MISC ? null : HelpfulArticleEnum.MISC
              )
            }
          >
            <Label as="span">Foreslå forbedring</Label>
          </Button>
        </div>
        {activeState !== null && (
          <form
            className={cl(
              "animate-fadeIn mt-4 flex w-full max-w-sm flex-col gap-4"
            )}
          >
            <Textarea
              ref={textAreaRef}
              error={errorMsg}
              label={getPlaceholder()}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              maxLength={600}
              minRows={3}
              description="Ikke skriv inn navn eller andre personopplysninger"
            />
            <Button className="mr-auto" onClick={handleSend}>
              Send inn svar
            </Button>
          </form>
        )}
        {thanksFeedback && (
          <BodyShort size="small">Takk for tilbakemeldingen!</BodyShort>
        )}
      </div>
    </div>
  );
};

export default Feedback;
