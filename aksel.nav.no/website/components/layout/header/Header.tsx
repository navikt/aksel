import AkselLogo from "@/assets/Logo";
import { amplitudeLogNavigation } from "@/logging";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Box, Button, HStack, Page, Show, Spacer } from "@navikt/ds-react";
import cl from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Hamburger } from "./parts/Hamburger";
import HeaderLink from "./parts/HeaderLink";

export const GlobalSearch = dynamic(
  () => import("../../website-modules/search/Search"),
  {
    loading: () => (
      <Button
        variant="primary"
        className="h-11 bg-deepblue-600 hover:bg-deepblue-700"
        aria-keyshortcuts="Control+b"
        icon={
          <MagnifyingGlassIcon
            className="pointer-events-none -mt-[1px] shrink-0 text-2xl"
            aria-label="Åpne meny"
            aria-hidden
          />
        }
        iconPosition="left"
      >
        Søk
      </Button>
    ),
    ssr: false,
  },
);

const Header = ({
  variant = "default",
}: {
  variant?: "blogg" | "subtle" | "default" | "transparent";
}) => {
  return (
    <header
      className={cl("z-20", {
        "bg-amber-50": variant === "blogg",
        "bg-surface-default": variant === "default",
        "bg-surface-subtle": variant === "subtle",
        "bg-surface-transparent": variant === "transparent",
      })}
    >
      <a className="skiplink" href="#hovedinnhold">
        Hopp til innhold
      </a>
      <Page.Block width="2xl">
        <div className="flex h-header items-center pr-4 lg:pr-6">
          <Link
            href="/"
            passHref
            onClick={(e) =>
              amplitudeLogNavigation(
                "header",
                e.currentTarget.getAttribute("href"),
              )
            }
            className="mx-4 grid h-11 place-items-center rounded px-2 focus:outline-none focus-visible:shadow-focus sm:mr-6"
          >
            <AkselLogo className="text-deepblue-800" />
            <span className="sr-only">Aksel</span>
          </Link>

          <Spacer />
          <Show above="lg" asChild>
            <Box
              as="nav"
              paddingInline={{ xs: "0 2", lg: "0 8" }}
              aria-label="Hovedmeny"
            >
              <HStack as="ul" gap="2" align="center">
                <HeaderLink name="God praksis" href="/god-praksis" />
                <HeaderLink name="Grunnleggende" href="/grunnleggende" />
                <HeaderLink name="Ikoner" href="/ikoner" prefetch={false} />
                <HeaderLink name="Komponenter" href="/komponenter" />
                <HeaderLink name="Mønster & Maler" href="/monster-maler" />
                <HeaderLink name="Bloggen" href="/produktbloggen" />
              </HStack>
            </Box>
          </Show>
          <HStack align="center" gap="2">
            <GlobalSearch />
            <Hamburger />
          </HStack>
        </div>
      </Page.Block>
    </header>
  );
};

export default Header;
