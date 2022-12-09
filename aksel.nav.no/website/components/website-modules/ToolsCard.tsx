import { BodyShort, Link } from "@navikt/ds-react";
import NextLink from "next/link";
const tools = [
  {
    title: "Identitet",
    description: "Åpen for alle",
    href: "https://identitet.nav.no/",
    icon: (
      <svg
        className="h-7 w-7"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M19.25 27.4 21.05 21.65 16.3 17.95H22.1L24 12L25.85 17.95H31.7L26.95 21.65L28.7 27.4L24 23.85ZM12.2 46V30.8Q9.95 28.45 8.975 25.65Q8 22.85 8 20Q8 13.2 12.6 8.6Q17.2 4 24 4Q30.8 4 35.4 8.6Q40 13.2 40 20Q40 22.85 39.025 25.65Q38.05 28.45 35.8 30.8V46L24 42.05ZM24 33Q29.45 33 33.225 29.225Q37 25.45 37 20Q37 14.55 33.225 10.775Q29.45 7 24 7Q18.55 7 14.775 10.775Q11 14.55 11 20Q11 25.45 14.775 29.225Q18.55 33 24 33ZM15.2 41.8 24 39.05 32.8 41.8V33.25Q30.8 34.7 28.5 35.35Q26.2 36 24 36Q21.8 36 19.5 35.35Q17.2 34.7 15.2 33.25ZM24 37.5Q24 37.5 24 37.5Q24 37.5 24 37.5Q24 37.5 24 37.5Q24 37.5 24 37.5Z"
        />
      </svg>
    ),
  },
  {
    title: "Security Playbook",
    description: "Åpen for alle",
    href: "https://sikkerhet.nav.no/",
    icon: (
      <svg
        className="h-7 w-7"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M24 44Q17 42.25 12.5 35.875Q8 29.5 8 21.9V10L24 4L40 10V21.9Q40 29.5 35.5 35.875Q31 42.25 24 44ZM24 40.9Q29.3 39.15 32.775 34.475Q36.25 29.8 36.85 24H24V7.25L11 12.1V21.9Q11 22.5 11.025 22.925Q11.05 23.35 11.15 24H24Z"
        />
      </svg>
    ),
  },
  {
    title: "Etterlevelse",
    description: "Kun for ansatte",
    href: "https://etterlevelse.intern.nav.no/",
    icon: (
      <svg
        className="h-7 w-7"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M17.3 45 13.5 38.5 5.95 36.95 6.8 29.6 2 24 6.8 18.45 5.95 11.1 13.5 9.55 17.3 3 24 6.1 30.7 3 34.55 9.55 42.05 11.1 41.2 18.45 46 24 41.2 29.6 42.05 36.95 34.55 38.5 30.7 45 24 41.9ZM24 24ZM21.85 30.65 33.2 19.4 30.95 17.35 21.85 26.35 17.1 21.4 14.8 23.65ZM18.65 41.05 24 38.8 29.5 41.05 32.85 36.05 38.7 34.55 38.1 28.6 42.15 24 38.1 19.3 38.7 13.35 32.85 11.95 29.4 6.95 24 9.2 18.5 6.95 15.15 11.95 9.3 13.35 9.9 19.3 5.85 24 9.9 28.6 9.3 34.65 15.15 36.05Z"
        />
      </svg>
    ),
  },
];

export const ToolCard = () => {
  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center justify-center gap-16 rounded-2xl bg-[#99F6E4] py-12 px-2 md:flex-row md:justify-evenly md:gap-4">
      {tools.map((t) => (
        <div key={t.title} className="flex w-56 items-center gap-4 md:w-fit">
          <div className="rotate-45 rounded-lg bg-[#5EEAD4] p-3">
            <div className="-rotate-45">{t.icon}</div>
          </div>
          <div>
            <NextLink href={t.href} passHref>
              <Link className="text-text-default mb-1 font-semibold no-underline hover:underline">
                {t.title}
              </Link>
            </NextLink>
            <div>{t.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
