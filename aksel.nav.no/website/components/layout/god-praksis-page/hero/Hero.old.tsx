import cl from "clsx";
import Link from "next/link";
import { useRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyLong, Box, Heading, Modal, VStack } from "@navikt/ds-react";
import { GpTemaT, HeroNavT } from "@/layout/god-praksis-page/types";

/**
 * TODO:
 * - Handle dynamic resize better than vw fontsize?
 * - - Can flex-shrink be used here?
 *
 * - Replace liste-elements with chips like in figma
 * - Better aria-label for <nav>
 */
function Hero({ tema, heroNav }: { tema: GpTemaT | null } & HeroNavT) {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <Box
      background="surface-alt-3-subtle"
      borderRadius="large"
      paddingInline={{ xs: "4", lg: "10" }}
      paddingBlock="10 6"
      className="bg-gradient-to-tr from-deepblue-200 via-deepblue-100 to-deepblue-100 relative overflow-clip"
    >
      <VStack gap="6" align="start" className="z-10 relative">
        <Heading
          size="xlarge"
          as="button"
          className="py-1 w-full hover:shadow-small transition-shadow justify-between sm:justify-start sm:w-fit sm:py-2 pl-4 pr-2 sm:pl-6 sm:pr-4 [font-size:min(8vw,2.5rem)] focus-visible:shadow-focus focus:outline-none text-aksel-heading bg-surface-subtle flex gap-1 sm:gap-2 items-center rounded-full shadow-xsmall"
          onClick={() => modalRef.current?.showModal()}
        >
          {tema ? tema.title : "Alle tema"}
          <ChevronDownIcon
            aria-hidden
            className="shrink-0 [font-size:min(8vw,3rem)]"
          />
        </Heading>

        {tema?.description && <BodyLong>{tema.description}</BodyLong>}
      </VStack>
      <Modal
        ref={modalRef}
        header={{ heading: "Tema" }}
        width="small"
        closeOnBackdropClick
      >
        <Modal.Body>
          <nav aria-label="hovedmeny">
            <ul>
              <li className="my-2 flex h-11 items-center">
                <Link
                  href="/gp"
                  className={cl(
                    "hover:bg-surface-action-subtle-hover focus-visible:shadow-focus relative flex h-full w-full items-center rounded px-2 focus:outline-none",
                    {
                      "before:bg-surface-action-selected pl-4 font-semibold before:absolute before:left-0 before:h-6 before:w-1 before:rounded-full":
                        !tema,
                    }
                  )}
                  onClick={() => {
                    modalRef.current?.close();
                  }}
                >
                  Alle tema
                </Link>
              </li>
              {heroNav.map((x) => (
                <li className="my-2 flex h-11 items-center" key={x.slug}>
                  <Link
                    href={`/gp/${x.slug}`}
                    className={cl(
                      "hover:bg-surface-action-subtle-hover focus-visible:shadow-focus relative flex h-full w-full items-center rounded px-2 focus:outline-none",
                      {
                        "before:bg-surface-action-selected pl-4 font-semibold before:absolute before:left-0 before:h-6 before:w-1 before:rounded-full":
                          tema?.slug === x.slug,
                      }
                    )}
                    onClick={() => {
                      modalRef.current?.close();
                    }}
                  >
                    {x.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Modal.Body>
      </Modal>
      <Cube />
    </Box>
  );
}

function Cube() {
  return (
    <svg
      width="720"
      height="409"
      viewBox="0 0 720 409"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-0 top-0 pointer-events-none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1329.81 -664C1330.61 -664 1331.37 -663.684 1331.93 -663.122L2078.12 85.3978C2079.29 86.5681 2079.29 88.4656 2078.12 89.6359L1331.93 838.156C1331.37 838.718 1330.61 839.034 1329.82 839.034C1329.02 839.034 1328.26 838.718 1327.7 838.156L581.505 89.6359C580.945 89.0739 580.63 88.3116 580.63 87.5168C580.63 86.722 580.945 85.9598 581.505 85.3978L1327.7 -663.122C1328.26 -663.684 1329.02 -664 1329.81 -664ZM1329.81 -656.765L587.842 87.5168L1329.82 831.799L2071.79 87.5168L1329.81 -656.765ZM130.185 -208.034C130.977 -208.034 131.737 -207.718 132.297 -207.156L878.495 541.364C879.662 542.534 879.662 544.432 878.495 545.602L132.298 1294.12C131.737 1294.68 130.977 1295 130.185 1295C129.393 1295 128.633 1294.68 128.073 1294.12L-618.125 545.602C-619.292 544.432 -619.292 542.534 -618.125 541.364L128.073 -207.156C128.633 -207.718 129.393 -208.034 130.185 -208.034ZM-611.788 543.483L130.185 1287.77L872.158 543.483L130.185 -200.799L-611.788 543.483Z"
        className="fill-deepblue-50"
      />
    </svg>
  );
}

export default Hero;
