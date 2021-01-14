import React from "react";
import { Heading, Text, Paragraph, Lead } from "../src/index";

export default {
  title: "@navikt/typography",
  component: Heading,
};

export const heading = () => {
  return (
    <>
      <Heading level={1} size="xxl">
        xxl
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

export const text = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text size="large">large</Text>
      <Text size="medium">medium</Text>
      <Text size="small">small</Text>
      <Text size="xs">xs</Text>
    </div>
  );
};

export const article = () => {
  return (
    <article>
      <Heading level={1} size="xxl">
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
