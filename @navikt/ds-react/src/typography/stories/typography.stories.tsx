import React from "react";
import { Heading, Text, Paragraph, Lead } from "../index";
import { Title, Component, Body, Detail, Ingress, Label } from "../index";
import "./index.css";

export default {
  title: "ds-react/typography",
  component: Heading,
};

const heading = () => {
  return (
    <>
      <Heading level={1} size="2xl">
        2xl
      </Heading>
      <Heading level={2} size="xl">
        xl
      </Heading>
      <Heading level={3} size="large">
        large
      </Heading>
      <Heading level={4} size="medium">
        medium
      </Heading>
      <Heading level={5} size="small">
        small
      </Heading>
    </>
  );
};

const text = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text size="large">large</Text>
      <Text size="medium">medium</Text>
      <Text size="small">small</Text>
      <Text size="xs">xs</Text>
    </div>
  );
};

const article = () => {
  return (
    <article>
      <Heading level={1} size="2xl">
        Uføretrygd
      </Heading>
      <Lead>
        Uføretrygd kan være aktuelt for deg som har varig nedsatt inntektsevne
        på grunn av sykdom eller skade.
      </Lead>
      <Paragraph>
        Uføretrygden erstatter den delen av inntektsevnen du har tapt på grunn
        av varig sykdom eller skade.
      </Paragraph>
      <Paragraph>
        Om du har rett til 100 prosent uføretrygd eller gradert (delvis)
        uføretrygd, er avhengig av inntektsevnen din. Har du mulighet til å
        jobbe for eksempel 40 prosent, kan du ha rett til 60 prosent uføretrygd.{" "}
      </Paragraph>
      <p>
        Anim duis aliqua ad culpa amet ad. Anim deserunt veniam laborum commodo
        in excepteur reprehenderit. Sunt occaecat velit fugiat qui Lorem officia
        reprehenderit elit cillum occaecat. Lorem laborum adipisicing non qui
        consectetur do minim nostrud adipisicing qui. Sint et dolore commodo
        cillum elit magna reprehenderit labore consequat reprehenderit magna
        consequat qui. Ullamco eu sunt cupidatat laborum. Velit eu ex culpa
        voluptate proident tempor deserunt. Do pariatur consequat incididunt ad
        ut velit. Ea nisi eiusmod aliquip laboris nulla in ipsum amet sunt
        magna. Laboris pariatur nisi in culpa adipisicing sit esse esse. Ullamco
        dolore mollit minim dolor reprehenderit. Velit ipsum proident nostrud
        laborum non. Sunt consequat aute quis minim reprehenderit ipsum sunt
        ipsum.
      </p>
      <Heading level={2} size="xl">
        Hvem kan få uføretrygd?
      </Heading>
      <Paragraph>
        For å ha rett til å få uføretrygd må du som hovedregel oppfylle disse
        vilkårene:
      </Paragraph>
      <ul>
        <li>Du må være mellom 18 og 67 år.</li>
        <li>
          Du må ha vært medlem av folketrygden i de siste tre årene før du ble
          syk.
        </li>
        <li>
          Sykdom og/eller skade må være hovedårsaken til at inntektsevnen din er
          nedsatt.
        </li>
        <li>
          Hensiktsmessig behandling og arbeidsrettede tiltak må være
          gjennomført.
        </li>
        <li>
          Inntektsevnen din må være varig nedsatt med minst 50 prosent på grunn
          av sykdom og/eller skade.
        </li>
      </ul>
      <Paragraph>
        Mottar du{" "}
        <a href="https://www.nav.no/no/person/arbeid/arbeidsavklaringspenger/arbeidsavklaringspenger-aap">
          arbeidsavklaringspenger
        </a>{" "}
        på søknadstidspunktet er det tilstrekkelig at inntektsevnen din er varig
        nedsatt med minst 40 prosent. Skyldes uførheten en godkjent{" "}
        <a href="https://www.nav.no/no/person/arbeid/yrkesskade-og-yrkessykdom">
          yrkesskade eller yrkessykdom
        </a>
        , er det tilstrekkelig at inntektsevnen din er varig nedsatt med minst
        30 prosent.
      </Paragraph>
    </article>
  );
};

export const TypoMedSpacing = () => <TypoMal spacing={true} />;
export const TypoUtenSpacing = () => <TypoMal spacing={false} />;

const TypoMal = ({ ...rest }) => {
  const lorem = (text) => (
    <>
      {text} <br /> Veniam consequat cillum pariatur officia duis aute labore
      anim labore. Pariatur ad duis do nulla.
    </>
  );
  return (
    <div
      className="typo-story"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <Title {...rest} level={1} size="2xl">
          {lorem("Title 2xl")}
        </Title>
        <Title {...rest} level={2} size="xl">
          {lorem("Title xl")}
        </Title>
        <Title {...rest} level={3} size="l">
          {lorem("Title l")}
        </Title>
        <Title {...rest} level={4} size="m">
          {lorem("Title m")}
        </Title>
        <Title {...rest} level={5} size="s">
          {lorem("Title s")}
        </Title>
      </div>
      <div>
        <Ingress {...rest}>{lorem("Ingress")}</Ingress>
      </div>
      <div>
        <Body {...rest}>{lorem("Body")}</Body>
        <Body {...rest} size="s">
          {lorem("Body small")}
        </Body>
      </div>
      <div>
        <Label {...rest}>{lorem("Label")}</Label>
        <Label {...rest} size="s">
          {lorem("Label small")}
        </Label>
      </div>
      <div>
        <Detail {...rest}>{lorem("Detail")}</Detail>
        <Detail {...rest} size="s">
          {lorem("Detail small")}
        </Detail>
      </div>
      <div>
        <Component {...rest} {...rest}>
          {lorem("Component")}
        </Component>
        <Component {...rest} size="s">
          {lorem("Component small")}
        </Component>
      </div>
    </div>
  );
};

export const SideInnholdEksempel = () => {
  return (
    <div style={{ maxWidth: 600 }}>
      <Title level={1} size="2xl" spacing>
        Sidetittel
      </Title>
      <Body spacing>
        Aliqua ad et nisi commodo sit excepteur in commodo proident proident.
        Nostrud consectetur dolore eu nostrud aliqua. Adipisicing labore aliqua
        qui velit amet ea amet do. Magna anim velit et incididunt. Lorem ad
        pariatur pariatur quis magna cupidatat. Exercitation officia occaecat
        occaecat id nulla fugiat laborum elit laboris non est ex nostrud
        occaecat. Commodo laboris veniam cillum in aute.
      </Body>
      <Body spacing>
        Cillum consequat velit est ea voluptate. Et elit irure magna sit
        consequat mollit excepteur ad non excepteur velit exercitation aute.
        Fugiat deserunt quis nulla cupidatat esse quis ex. Laborum eiusmod culpa
        labore eu irure quis laborum. Irure veniam et nostrud do. Quis ut ea est
        culpa tempor anim.
      </Body>
      <Title level={2} size="xl" spacing>
        Underittel
      </Title>
      <Ingress spacing>
        Ingress: Mollit incididunt incididunt officia amet est et non aliqua
        officia nulla et aute aliqua culpa.
      </Ingress>
      <Body spacing>
        Commodo veniam enim laborum pariatur excepteur commodo do cillum. Nisi
        elit sunt commodo id in adipisicing cupidatat dolore dolore et tempor
        cupidatat. Cillum quis sunt in dolor occaecat.
      </Body>
      <Body spacing>
        Irure dolore laborum amet occaecat ex laboris mollit reprehenderit nisi
        laborum voluptate laborum. Ipsum eu sint laborum adipisicing ut
        incididunt laborum laborum. Ipsum non amet laboris quis Lorem est
        laborum qui pariatur ex eu. Eiusmod proident amet esse ex.
      </Body>
      <Body size="s" spacing>
        Irure dolore laborum amet occaecat ex laboris mollit reprehenderit nisi
        laborum voluptate laborum. Ipsum eu sint laborum adipisicing ut
        incididunt laborum laborum. Ipsum non amet laboris quis Lorem est
        laborum qui pariatur ex eu. Eiusmod proident amet esse ex.
      </Body>
    </div>
  );
};
