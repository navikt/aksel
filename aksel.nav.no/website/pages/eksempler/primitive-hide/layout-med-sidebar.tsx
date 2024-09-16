import cl from "clsx";
import { LinkIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  Box,
  CopyButton,
  HGrid,
  Heading,
  Hide,
  Label,
  Link,
  List,
  Show,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div className="py-12">
      <HGrid columns={{ xs: 1, md: "240px minmax(auto,700px)" }} gap="4">
        <Show above="md" asChild>
          <DesktopSidebar />
        </Show>
        <Hide above="md" asChild>
          <ContentFirst />
        </Hide>
        <Hide above="md" asChild>
          <MobileSidebar />
        </Hide>
        <ContentLast />
      </HGrid>
    </div>
  );
};

const ContentFirst = ({ className }: { className?: string }) => (
  <div className={cl("h-fit bg-surface-default p-10", className)}>
    <VStack gap="6">
      <VStack gap="2" align="start">
        <Heading size="large">Kort om pleiepenger for sykt barn</Heading>
        <CopyButton
          copyText="#"
          text="Kopier lenke"
          size="small"
          icon={<LinkIcon aria-hidden />}
        />
      </VStack>
      <List>
        <List.Item>
          Pleiepenger for sykt barn er for deg som må være borte fra jobb for å
          ta vare på et barn som på grunn av sykdom trenger pleie og omsorg hele
          tiden.
        </List.Item>
        <List.Item>
          Barnet må ha vært til behandling/utredning i sykehus eller annen
          spesialisthelsetjeneste.
        </List.Item>
        <List.Item>
          Det er ingen tidsbegrensing for hvor lenge du kan få pleiepenger når
          alle vilkårene er oppfylt.
        </List.Item>
      </List>
    </VStack>
  </div>
);

const ContentLast = () => (
  <div className="h-fit bg-surface-default p-10">
    <VStack gap="6">
      <VStack gap="2" align="start">
        <Heading size="large">Hvor lenge?</Heading>
        <CopyButton
          copyText="#"
          text="Kopier lenke"
          size="small"
          icon={<LinkIcon aria-hidden />}
        />
      </VStack>
      <BodyLong>
        Det er i utgangspunktet ikke tidsbegrensing for hvor lenge man kan få
        pleiepenger, så lenge vilkårene for å få pleiepenger er oppfylt.
      </BodyLong>
      <BodyLong>
        Det er egne regler hvis man oppholder seg utenfor EØS,{" "}
        <Link href="#">les mer om dette her.</Link>
      </BodyLong>
    </VStack>
  </div>
);

const LinkElement = ({ children }) => {
  return (
    <Label
      as="li"
      className="cursor-pointer px-4 py-3 text-text-action hover:bg-surface-action-subtle hover:text-text-default hover:underline"
    >
      {children}
    </Label>
  );
};

const DesktopSidebar = ({ className }: { className?: string }) => (
  <Box
    paddingBlock="10 4"
    paddingInline="6"
    background="surface-default"
    className={className}
  >
    <Box paddingBlock="0 2" paddingInline="4 0">
      <Heading size="medium" className="leading-heading-xlarge">
        Innhold
      </Heading>
    </Box>
    <nav aria-label="innhold">
      <ul>
        <LinkElement>Hvem kan få?</LinkElement>
        <LinkElement>Hvor lenge?</LinkElement>
        <LinkElement>Hvor mye penger kan du få?</LinkElement>
        <LinkElement>Når utbetales pengene?</LinkElement>
      </ul>
    </nav>
  </Box>
);

const MobileSidebar = ({ className }: { className?: string }) => (
  <DesktopSidebar className={className} />
);

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  showBreakpoints: true,
  background: "subtle",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Show/Hide fungerer bra til dynamisk endring av sidelayout basert på brekkpunkt sammen med HGrid",
  sandbox: false,
};
