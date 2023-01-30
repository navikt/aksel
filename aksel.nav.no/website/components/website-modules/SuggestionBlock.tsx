import { LightBulb } from "@navikt/ds-icons";
import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import cl from "classnames";

const SuggestionBlockComponent = ({
  variant,
  reference = "",
}: {
  variant: "komponent-beta" | "komponent-ny";
  reference?: string;
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
        <BodyLong className="mt-2">{options[variant]?.text}</BodyLong>
        <a
          href={options[variant].link + reference}
          className="border-border-strong active:bg-surface-active hover:bg-surface-hover focus-visible:shadow-focus mt-4 w-fit rounded border-[2px] px-3 py-[6px] font-semibold focus:outline-none"
        >
          Send innspill
        </a>
      </div>
    </div>
  );
};

export const SuggestionBlock = ({
  variant,
  reference = "",
}: {
  variant:
    | "ikoner"
    | "komponenter"
    | "komponent"
    | "komponent-ny"
    | "komponent-beta"
    | "ikon-ny"
    | "ikon";
  reference?: string;
}) => {
  if (variant === "komponent-ny" || variant === "komponent-beta") {
    return <SuggestionBlockComponent variant={variant} reference={reference} />;
  }

  return (
    <div
      className={cl(
        "ring-border-subtle flex justify-between rounded-lg px-6 py-4 ring-1",
        {
          "mb-0 mt-5": variant === "ikon" || variant === "ikon-ny",
          "mb-12": variant !== "ikon" && variant !== "ikon-ny",
          "bg-surface-info-subtle": variant === "ikon-ny",
        }
      )}
    >
      <BodyShort className="flex items-center gap-2">
        <LightBulb aria-hidden className="shrink-0 text-2xl" />
        {options[variant]?.text}
      </BodyShort>
      <a
        href={options[variant]?.link + reference}
        className="border-border-strong active:bg-surface-active hover:bg-surface-hover focus-visible:shadow-focus rounded border-[2px] px-3 py-[6px] font-semibold focus:outline-none"
      >
        Send forslag
      </a>
    </div>
  );
};

const issueUrl =
  "https://github.com/navikt/Designsystemet/issues/new?assignees=olejorgenbakken";

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
      "&labels=forespørsel+🥰%2Cnytt+✨&template=update-icon.yml&title=%5BInnspill+til+ikon%5D%3A+",
  },
  "komponent-ny": {
    text: "Denne komponenten er ny eller oppdatert. Tar du den i bruk ønsker vi gjerne innspill til hvordan den fungerer i tjenesten din!",
    link: `${issueUrl}&labels=forespørsel+🥰%2Ckomponenter+🧩%2Cnytt+✨&template=update-component.yml&title=%5BInnspill+til+komponent%5D%3A+`,
    heading: "Ny",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable={false}
        aria-hidden
      >
        <path
          d="M6.93936 14.0081C7.08779 13.7367 7.47756 13.7367 7.62599 14.0081L8.61115 15.8094C8.64706 15.875 8.70104 15.929 8.7667 15.9649L10.568 16.9501C10.8394 17.0985 10.8394 17.4883 10.568 17.6367L8.7667 18.6219C8.70104 18.6578 8.64706 18.7118 8.61115 18.7774L7.62599 20.5787C7.47756 20.8501 7.08779 20.8501 6.93936 20.5787L5.9542 18.7774C5.91829 18.7118 5.86431 18.6578 5.79865 18.6219L3.99735 17.6367C3.72596 17.4883 3.72596 17.0985 3.99735 16.9501L5.79865 15.9649C5.86431 15.929 5.91829 15.875 5.9542 15.8094L6.93936 14.0081Z"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M13.2871 3.42118C13.4355 3.14979 13.8253 3.14979 13.9737 3.42118L16.0502 7.21803C16.0862 7.28369 16.1401 7.33767 16.2058 7.37358L20.0026 9.45014C20.274 9.59857 20.274 9.98834 20.0026 10.1368L16.2058 12.2133C16.1401 12.2492 16.0862 12.3032 16.0502 12.3689L13.9737 16.1657C13.8253 16.4371 13.4355 16.4371 13.2871 16.1657L11.2105 12.3689C11.1746 12.3032 11.1206 12.2492 11.0549 12.2133L7.25809 10.1368C6.98671 9.98834 6.98671 9.59857 7.25809 9.45014L11.0549 7.37358C11.1206 7.33767 11.1746 7.28369 11.2105 7.21803L13.2871 3.42118Z"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  "komponent-beta": {
    text: "Komponenten er under utvikling. Dette kan medføre bugs slik at teamet ditt må ta stilling til om dere ønsker å bruke denne i produksjon. Hvis komponenten er prefikset med UNSAFE kan det også medføre breaking-changes i patch/minor versjon av kodepakker og i Figma. Tar du den i bruk ønsker vi gjerne innspill til hvordan den fungerer i tjenesten din!",
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
