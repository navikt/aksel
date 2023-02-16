import { BodyShort, Heading, Link } from "@navikt/ds-react";

import NextLink from "next/link";
import { EditButton, ScrollTop } from "../..";
import FooterForm from "./FooterForm";

const Footer = () => {
  return (
    <footer
      id="aksel-footer"
      data-hj-suppress
      data-theme="dark"
      className="algolia-ignore-index text-text-on-inverted bg-deepblue-800 relative flex w-full justify-center"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-screen-2xl gap-16 px-4 pt-12 pb-16 md:px-6">
        <div className="grid gap-12 xl:grid-cols-3 xl:gap-6">
          <ScrollTop />
          <div>
            <Heading level="2" size="small">
              Aksel
            </Heading>
            <BodyShort as="ul" className="mt-5 grid gap-2">
              <li>
                <NextLink href="/god-praksis/artikler/om-aksel" passHref>
                  <Link className="text-text-on-inverted focus:shadow-focus focus:text-text-default focus:bg-blue-200 focus:shadow-blue-200">
                    Om Aksel
                  </Link>
                </NextLink>
              </li>
              <li>
                <NextLink href="/god-praksis/artikler/skriv-for-aksel" passHref>
                  <Link className="text-text-on-inverted focus:shadow-focus focus:text-text-default focus:bg-blue-200 focus:shadow-blue-200">
                    Skriv for Aksel
                  </Link>
                </NextLink>
              </li>
              <li>
                <Link
                  className="text-text-on-inverted focus:shadow-focus focus:text-text-default focus:bg-blue-200 focus:shadow-blue-200"
                  href="https://nav-it.slack.com/archives/C7NE7A8UF"
                >
                  #Aksel-designsystemet på Slack
                </Link>
              </li>
              <li>
                <Link
                  className="text-text-on-inverted focus:shadow-focus focus:text-text-default focus:bg-blue-200 focus:shadow-blue-200"
                  href="/prinsipper/brukeropplevelse"
                >
                  Prinsipper for brukeropplevelse
                </Link>
              </li>
              <li>
                <Link
                  className="text-text-on-inverted focus:shadow-focus focus:text-text-default focus:bg-blue-200 focus:shadow-blue-200"
                  href="/side/tilgjengelighetserklaring-for-aksel"
                >
                  Tilgjengelighet
                </Link>
              </li>
              {/* <li>
                  <Link
                    className="text-text-on-inverted focus:shadow-focus focus:text-text-default focus:bg-blue-200 focus:shadow-blue-200"
                    href="https://nav-it.slack.com/archives/C7NE7A8UF"
                  >
                    Designsystemet på Slack
                  </Link>
                </li> */}
            </BodyShort>
          </div>
          <FooterForm />
        </div>
        <div className="grid xl:grid-cols-3 xl:gap-6">
          <div className="mb-4 grid gap-2 xl:mb-0">
            <svg
              width="64"
              height="20"
              viewBox="0 0 64 20"
              fill="none"
              aria-hidden
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2259_53938)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M63.4798 1H56.8198C56.8198 1 56.3608 1 56.1988 1.406L52.5138 12.693L48.8318 1.406C48.6688 1.001 48.2078 1.001 48.2078 1.001H35.4038C35.2694 1.00203 35.1407 1.05569 35.0454 1.15046C34.9501 1.24523 34.8956 1.37359 34.8938 1.508V5.341C34.8938 2.301 31.6608 1.001 29.7668 1.001C25.5268 1.001 22.6888 3.795 21.8048 8.044C21.7568 5.225 21.5228 4.215 20.7638 3.181C20.4148 2.674 19.9118 2.249 19.3638 1.896C18.2338 1.234 17.2188 1.001 15.0398 1.001H12.4798C12.4798 1.001 12.0178 1.001 11.8548 1.406L9.52582 7.18V1.508C9.52452 1.37411 9.47082 1.24606 9.37624 1.15128C9.28165 1.05651 9.15371 1.00256 9.01982 1.001H3.09682C3.09682 1.001 2.63982 1.001 2.47282 1.406L0.0528186 7.41C0.0528186 7.41 -0.189181 8.01 0.362819 8.01H2.63982V19.45C2.63982 19.734 2.86282 19.96 3.14782 19.96H9.01782C9.08466 19.9599 9.15082 19.9466 9.21253 19.9209C9.27423 19.8952 9.33027 19.8576 9.37744 19.8102C9.42462 19.7629 9.462 19.7067 9.48746 19.6449C9.51291 19.5831 9.52595 19.5168 9.52582 19.45V8.01H11.8148C13.1278 8.01 13.4048 8.046 13.9158 8.284C14.2238 8.401 14.5008 8.636 14.6528 8.907C14.9628 9.49 15.0398 10.19 15.0398 12.255V19.45C15.0398 19.734 15.2678 19.96 15.5498 19.96H21.1758C21.1758 19.96 21.8118 19.96 22.0628 19.33L23.3098 16.247C24.9678 18.571 27.6968 19.959 31.0888 19.959H31.8298C31.8298 19.959 32.4698 19.959 32.7228 19.331L34.8948 13.95V19.45C34.8948 19.5853 34.9485 19.715 35.0442 19.8106C35.1398 19.9063 35.2696 19.96 35.4048 19.96H41.1478C41.1478 19.96 41.7818 19.96 42.0358 19.33C42.0358 19.33 44.3328 13.625 44.3418 13.582H44.3458C44.4338 13.107 43.8348 13.107 43.8348 13.107H41.7848V3.316L48.2348 19.331C48.4858 19.959 49.1208 19.959 49.1208 19.959H55.9068C55.9068 19.959 56.5448 19.959 56.7968 19.331L63.9478 1.615C64.1948 1.001 63.4788 1.001 63.4788 1.001L63.4798 1ZM34.8928 13.108H31.0348C30.2962 13.108 29.5878 12.8146 29.0655 12.2923C28.5432 11.77 28.2498 11.0616 28.2498 10.323C28.2498 9.58437 28.5432 8.876 29.0655 8.35371C29.5878 7.83142 30.2962 7.538 31.0348 7.538H32.1138C32.8517 7.54012 33.5586 7.83465 34.0797 8.35706C34.6008 8.87946 34.8936 9.58713 34.8938 10.325V13.108H34.8928Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_2259_53938">
                  <rect width="63.9997" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Arbeids- og velferdsetaten
          </div>
          <span className="mb-1 self-end xl:mb-0" />
          {/* <BodyShort className="mb-1 self-end xl:mb-0">
            Redaktør: Eidar Grande Vollan
          </BodyShort> */}
          <div className="hidden self-end xl:block">
            <p>&copy; {new Date().getFullYear()} NAV</p>
            <NextLink href="/side/personvernerklaering" passHref>
              <a className="focus:bg-border-focus-on-inverted focus:text-text-default focus:ring-border-focus-on-inverted outline-none hover:underline focus:no-underline focus:ring">
                Personvernerklæring og informasjonskapsler
              </a>
            </NextLink>
          </div>
          <div className="block self-end xl:hidden">
            &copy; 2022 NAV |{" "}
            <NextLink href="/side/personvernerklaering" passHref>
              <a className="focus:bg-border-focus-on-inverted focus:ring-border-focus-on-inverted outline-none hover:underline focus:no-underline focus:ring">
                Personvernerklæring og informasjonskapsler
              </a>
            </NextLink>
          </div>
        </div>
      </div>
      <EditButton />
      <svg
        width="548"
        height="422"
        viewBox="0 0 548 422"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 bottom-0 z-0"
        aria-hidden
        focusable={false}
      >
        <path
          d="M664.991 350.212L431.631 116.852L664.64 116.852L898 350.212L664.991 350.212Z"
          stroke="#004367"
          strokeWidth="2.9687"
          strokeLinejoin="round"
        />
        <path
          d="M625.456 156.037L392.097 389.396L625.456 622.756L858.816 389.396L625.456 156.037Z"
          stroke="#004367"
          strokeWidth="2.9687"
          strokeLinejoin="round"
        />
        <path
          d="M353.262 195.222L119.903 428.581H352.912L586.271 195.222H353.262Z"
          stroke="#004367"
          strokeWidth="2.9687"
          strokeLinejoin="round"
        />
        <path
          d="M314.076 234.407L80.7169 467.767L314.076 701.126L547.436 467.767L314.076 234.407Z"
          stroke="#004367"
          strokeWidth="2.9687"
          strokeLinejoin="round"
        />
        <path
          d="M508.251 506.951L274.892 740.31H507.901L741.261 506.951H508.251Z"
          stroke="#004367"
          strokeWidth="2.9687"
          strokeLinejoin="round"
        />
      </svg>
    </footer>
  );
};

export default Footer;
