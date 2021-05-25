import React from "react";
import { Title, BodyShort, BodyLong, Detail, Ingress, Label } from "../index";
import "./index.css";

export default {
  title: "ds-react/typography",
  component: BodyLong,
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
        <BodyLong {...rest}>{lorem("BodyLong")}</BodyLong>
        <BodyLong {...rest} size="s">
          {lorem("BodyLong small")}
        </BodyLong>
      </div>
      <div>
        <BodyShort {...rest} {...rest}>
          {lorem("BodyShort")}
        </BodyShort>
        <BodyShort {...rest} size="s">
          {lorem("BodyShort small")}
        </BodyShort>
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
    </div>
  );
};

export const SideInnholdEksempel = () => {
  return (
    <div style={{ maxWidth: 600 }}>
      <Title level={1} size="2xl" spacing>
        Title lvl 1 2xl
      </Title>
      <BodyLong spacing>
        BodyLong: Aliqua ad et nisi commodo sit excepteur in commodo proident
        proident. Nostrud consectetur dolore eu nostrud aliqua. Adipisicing
        labore aliqua qui velit amet ea amet do. Magna anim velit et incididunt.
        Lorem ad pariatur pariatur quis magna cupidatat. Exercitation officia
        occaecat occaecat id nulla fugiat laborum elit laboris non est ex
        nostrud occaecat. Commodo laboris veniam cillum in aute.
      </BodyLong>
      <BodyLong spacing>
        BodyLong: Cillum consequat velit est ea voluptate. Et elit irure magna
        sit consequat mollit excepteur ad non excepteur velit exercitation aute.
        Fugiat deserunt quis nulla cupidatat esse quis ex. Laborum eiusmod culpa
        labore eu irure quis laborum. Irure veniam et nostrud do. Quis ut ea est
        culpa tempor anim.
      </BodyLong>
      <Detail>
        Detail: Dolore commodo ad veniam commodo aute voluptate est officia sunt
        proident irure consectetur excepteur.
      </Detail>
      <Title level={2} size="xl" spacing>
        Title lvl 2 xl
      </Title>
      <Ingress spacing>
        Ingress: Mollit incididunt incididunt officia amet est et non aliqua
        officia nulla et aute aliqua culpa.
      </Ingress>
      <BodyLong spacing>
        BodyLong: Commodo veniam enim laborum pariatur excepteur commodo do
        cillum. Nisi elit sunt commodo id in adipisicing cupidatat dolore dolore
        et tempor cupidatat. Cillum quis sunt in dolor occaecat.
      </BodyLong>
      <BodyLong spacing>
        BodyLong: Irure dolore laborum amet occaecat ex laboris mollit
        reprehenderit nisi laborum voluptate laborum. Ipsum eu sint laborum
        adipisicing ut incididunt laborum laborum. Ipsum non amet laboris quis
        Lorem est laborum qui pariatur ex eu. Eiusmod proident amet esse ex.
      </BodyLong>
      <BodyLong size="s" spacing>
        BodyLong small: Irure dolore laborum amet occaecat ex laboris mollit
        reprehenderit nisi laborum voluptate laborum. Ipsum eu sint laborum
        adipisicing ut incididunt laborum laborum. Ipsum non amet laboris quis
        Lorem est laborum qui pariatur ex eu. Eiusmod proident amet esse ex.
      </BodyLong>
      <BodyShort spacing>
        BodyShort: Id consectetur velit sunt laboris consequat ullamco
        incididunt.
      </BodyShort>
      <BodyShort size="s" spacing>
        BodyShort small: Sunt amet officia sit excepteur sit pariatur sit
        reprehenderit irure ipsum.
      </BodyShort>
    </div>
  );
};
