import {
  BellIcon,
  LeaveIcon,
  MagnifyingGlassIcon,
  MenuHamburgerIcon,
  PersonIcon,
} from "@navikt/aksel-icons";
import { BodyShort, Button, HStack, Hide } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <header className="bg-surface-default grid h-20">
      <HStack as="nav" justify="space-between" align="center">
        <a href="#" className="px-2 py-5">
          <Logo />
        </a>
        <div className="grid h-full">
          <HStack align="center">
            <Button icon={<MenuHamburgerIcon aria-hidden />} variant="tertiary">
              Meny
            </Button>
            <Hide below="md">
              <Button
                icon={<MagnifyingGlassIcon aria-hidden />}
                variant="tertiary"
              >
                Søk
              </Button>
            </Hide>
            <Button icon={<BellIcon aria-hidden />} variant="tertiary">
              Varsler
            </Button>
            <Hide below="md">
              <Button icon={<PersonIcon aria-hidden />} variant="tertiary">
                <BodyShort weight="semibold" truncate className="max-w-[10vw]">
                  Ola Aksel Norman
                </BodyShort>
              </Button>
            </Hide>
            <Hide below="md">
              <Button icon={<LeaveIcon aria-hidden />} variant="tertiary">
                Logg ut
              </Button>
            </Hide>
          </HStack>
        </div>
      </HStack>
    </header>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
  desc: "Hide gjør det enklere å konsistent gjøre layout-endringer ved konkrete brekkpunt",
};

export const args = {
  index: 2,
  desc: "Prøv å endre størrelse på nettleservindu",
};

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="20"
      fill="none"
      aria-hidden
    >
      <path
        fill="#C30000"
        fillRule="evenodd"
        d="M63.48.52h-6.66s-.459 0-.621.406l-3.685 11.287L48.832.926c-.163-.405-.624-.405-.624-.405H35.404a.514.514 0 0 0-.51.507v3.833c0-3.04-3.233-4.34-5.127-4.34-4.24 0-7.078 2.794-7.962 7.043-.048-2.819-.282-3.829-1.041-4.863-.349-.507-.852-.932-1.4-1.285-1.13-.662-2.145-.895-4.324-.895h-2.56s-.462 0-.625.405L9.526 6.7V1.028A.512.512 0 0 0 9.02.521H3.097s-.457 0-.624.405L.053 6.93s-.242.6.31.6H2.64v11.44c0 .284.223.51.508.51h5.87a.509.509 0 0 0 .508-.51V7.53h2.289c1.313 0 1.59.036 2.101.274.308.117.585.352.737.623.31.583.387 1.283.387 3.348v7.195c0 .284.228.51.51.51h5.626s.636 0 .887-.63l1.247-3.083c1.658 2.324 4.387 3.712 7.779 3.712h.741s.64 0 .893-.628l2.172-5.381v5.5a.51.51 0 0 0 .51.51h5.743s.634 0 .888-.63c0 0 2.297-5.705 2.306-5.748h.004c.088-.475-.511-.475-.511-.475h-2.05V2.836l6.45 16.015c.251.628.886.628.886.628h6.786s.638 0 .89-.628l7.151-17.716c.247-.614-.469-.614-.469-.614ZM34.893 12.628h-3.858a2.784 2.784 0 1 1 0-5.57h1.079a2.788 2.788 0 0 1 2.78 2.787v2.783Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
