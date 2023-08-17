import { LightBulbIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Button, Heading } from "@navikt/ds-react";
import cl from "clsx";
import { ChangeLogIconOutline } from "components/assets";

const SuggestionBlockComponent = ({
  variant,
  reference = "",
  unsafe = false,
}: {
  variant: "komponent-beta" | "komponent-ny";
  reference?: string;
  unsafe?: boolean;
}) => {
  return (
    <div
      className={cl("mb-12 flex gap-3 rounded-lg px-6 py-4 ring-1 ring-inset", {
        "bg-surface-info-subtle ring-border-subtle": variant === "komponent-ny",
        "bg-violet-50 ring-violet-300": variant === "komponent-beta",
      })}
    >
      <span className="shrink-0 text-2xl">{options[variant]?.icon}</span>
      <div className="grid">
        <Heading size="small" level="2">
          {options[variant]?.heading}
        </Heading>
        <BodyLong className="mt-2">
          {variant === "komponent-beta" && unsafe
            ? options["komponent-beta-unsafe"].text
            : options[variant]?.text}
        </BodyLong>
        <Button
          variant="secondary-neutral"
          as="a"
          href={options[variant].link + reference}
          className="mt-4 w-fit"
          target="_blank"
          rel="noreferrer noopener"
        >
          Send innspill
        </Button>
      </div>
    </div>
  );
};

const SuggestionBlockIcon = ({
  variant,
  reference = "",
}: {
  variant: "ikon" | "ikon-ny";
  reference?: string;
}) => {
  return (
    <div className={cl("mb-12 mt-6 flex gap-3 rounded-lg  py-4 ")}>
      <span className="shrink-0 text-2xl">{options[variant]?.icon}</span>
      <div className="grid">
        {options[variant]?.heading && (
          <Heading size="small" level="2">
            {options[variant]?.heading}
          </Heading>
        )}
        <BodyLong className="mt-2">{options[variant]?.text}</BodyLong>
        <Button
          variant="secondary"
          as="a"
          href={options[variant].link + reference}
          className="mt-4 w-fit"
          target="_blank"
          rel="noreferrer noopener"
        >
          Send innspill
        </Button>
      </div>
    </div>
  );
};

export const SuggestionBlock = ({
  variant,
  reference = "",
  unsafe,
}: {
  variant:
    | "ikoner"
    | "komponenter"
    | "komponent"
    | "komponent-ny"
    | "komponent-beta"
    | "ikon-ny"
    | "ikon-not-found"
    | "ikon";
  reference?: string;
  unsafe?: boolean;
}) => {
  if (variant === "komponent-ny" || variant === "komponent-beta") {
    return (
      <SuggestionBlockComponent
        variant={variant}
        unsafe={unsafe}
        reference={reference}
      />
    );
  }

  if (variant === "ikon-ny" || variant === "ikon") {
    return <SuggestionBlockIcon variant={variant} reference={reference} />;
  }

  return (
    <div
      className={cl(
        "ring-border-subtle flex justify-between gap-3 rounded-lg ",
        {
          "mb-12 px-6 py-4 ring-1": variant !== "ikon-not-found",
          "m-0 bg-teal-100 px-6 py-4 ring-1 ring-teal-300":
            variant === "ikon-not-found",
        }
      )}
    >
      <BodyShort className="flex items-center gap-2">
        <LightBulbIcon aria-hidden className="shrink-0" fontSize="1.75rem" />
        {options[variant]?.text}
      </BodyShort>
      <Button
        variant="secondary-neutral"
        as="a"
        href={options[variant]?.link + reference}
        target="_blank"
        rel="noreferrer noopener"
      >
        Send forslag
      </Button>
    </div>
  );
};

const issueUrl = "https://github.com/navikt/aksel/issues/new?assignees=KenAJoh";

const options: {
  [key: string]: {
    text: string;
    link: string;
    heading?: string;
    icon?: React.ReactNode;
  };
} = {
  ikoner: {
    text: "Har du forslag til nye ikoner, eller endringer?",
    link:
      issueUrl +
      "&labels=nytt+✨%2Cikoner+🖼%2Cforespørsel+🥰&template&template=new-icon.yaml&title=%5BNytt+ikon%5D%3A+",
  },
  komponenter: {
    text: "Har du forslag til nye komponenter, eller endringer?",
    link:
      issueUrl +
      "&labels=nytt+✨%2Cforespørsel+🥰%2Ckomponenter+🧩&template=new-component.yml&title=%5BNy+komponent%5D%3A+",
  },
  komponent: {
    text: "Har du innspill til komponenten?",
    link: `${issueUrl}&labels=forespørsel+🥰%2Ckomponenter+🧩&template=update-component.yml&title=%5BInnspill+til+komponent%5D%3A+`,
  },
  ikon: {
    text: "Har du innspill til ikonet?",
    link:
      issueUrl +
      "&labels=forespørsel+🥰&template=update-icon.yml&title=%5BInnspill+til+ikon%5D%3A+",
  },
  "ikon-ny": {
    text: "Har du innspill til ikonet?",
    link:
      issueUrl +
      "&labels=forespørsel+🥰%2Cnytt+✨%2Cikoner+🖼&template=update-icon.yml&title=%5BTilbakemelding%20p%C3%A5%20ikon%5D%3A+",
  },
  "ikon-not-found": {
    text: "Har du forslag til nye ikoner? Trykk på bidra eller send inn et nytt forslag!",
    link:
      issueUrl +
      "&labels=nytt+✨%2Cikoner+🖼%2Cforespørsel+🥰&template&template=new-icon.yaml&title=%5BNytt+ikon%5D%3A+",
  },
  "komponent-ny": {
    text: "Denne komponenten er ny eller oppdatert. Tar du den i bruk ønsker vi gjerne innspill til hvordan den fungerer i tjenesten din!",
    link: `${issueUrl}&labels=forespørsel+🥰%2Ckomponenter+🧩%2Cnytt+✨&template=update-component.yml&title=%5BInnspill+til+komponent%5D%3A+`,
    heading: "Ny",
    icon: <ChangeLogIconOutline />,
  },
  "komponent-beta": {
    text: "Komponenten er under utvikling, men klar for adopsjon. Vi ønsker gjerne innspill på hvordan den fungerer og hvilken forbedringer vi kan gjøre.",
    link: `${issueUrl}&labels=forespørsel+🥰%2Ckomponenter+🧩%2Cbeta+🧪&template=update-component.yml&title=%5BInnspill+til+komponent%5D%3A+`,
    heading: "Beta",
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable={false}
        aria-hidden
      >
        <path
          d="M14.5471 3.99994H10.4528V9.48408L4.83594 17.1731C3.94768 18.3891 4.92474 19.9999 6.55053 19.9999H18.4495C20.0753 19.9999 21.0523 18.3891 20.1641 17.1731L14.5471 9.48408V3.99994Z"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 4H15.5"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.75 12L16.25 12"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  "komponent-beta-unsafe": {
    text: "Komponenten er under utvikling. Så lenge komponenten er prefikset med UNSAFE kan det også medføre breaking-changes i minor versjon av kodepakker og i Figma. Teamet ditt må ta selv ta stilling til om dere ønsker å bruke denne i produksjon.",
    link: `${issueUrl}&labels=forespørsel+🥰%2Ckomponenter+🧩%2Cbeta+🧪&template=update-component.yml&title=%5BInnspill+til+komponent%5D%3A+`,
    heading: "Beta",
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable={false}
        aria-hidden
      >
        <path
          d="M14.5471 3.99994H10.4528V9.48408L4.83594 17.1731C3.94768 18.3891 4.92474 19.9999 6.55053 19.9999H18.4495C20.0753 19.9999 21.0523 18.3891 20.1641 17.1731L14.5471 9.48408V3.99994Z"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 4H15.5"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.75 12L16.25 12"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};
