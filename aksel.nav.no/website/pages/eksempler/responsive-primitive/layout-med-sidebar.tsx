import { LinkIcon } from "@navikt/aksel-icons";
import {
  Hide,
  Show,
  HGrid,
  Heading,
  BodyLong,
  Link,
  CopyButton,
  VStack,
  Label,
  List,
} from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="bg-surface-subtle p-16">
      <HGrid columns={{ xs: 1, md: "240px minmax(auto,700px)" }} gap="4">
        <Show above="md">
          <DesktopSidebar />
        </Show>
        <Hide above="md">
          <ContentFirst />
        </Hide>
        <Hide above="md">
          <MobileSidebar />
        </Hide>
        <ContentLast />
      </HGrid>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
  desc: "Show/Hide passer bra til dynamisk endring av sidelayout basert på brekkpunkt sammen med HGrid",
};

export const args = {
  index: 2,
  desc: "Prøv å endre størrelse på nettleservindu",
};

const ContentFirst = () => (
  <div className="bg-surface-default h-fit p-10">
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
  <div className="bg-surface-default h-fit p-10">
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
      className="text-text-action hover:bg-surface-action-subtle hover:text-text-default cursor-pointer px-4 py-3 hover:underline"
    >
      {children}
    </Label>
  );
};

const DesktopSidebar = () => (
  <div className="bg-surface-default p-4 pt-10">
    <div className="pb-2 pl-4">
      <Heading size="medium" className="leading-heading-xlarge">
        Innhold
      </Heading>
    </div>
    <nav aria-label="innhold">
      <ul>
        <LinkElement>Hvem kan få?</LinkElement>
        <LinkElement>Hvor lenge?</LinkElement>
        <LinkElement>Hvor mye penger kan du få?</LinkElement>
        <LinkElement>Når utbetales pengene?</LinkElement>
      </ul>
    </nav>
  </div>
);

const MobileSidebar = () => <DesktopSidebar />;
