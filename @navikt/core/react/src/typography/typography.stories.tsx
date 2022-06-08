import React from "react";
import {
  Heading,
  BodyShort,
  BodyLong,
  Detail,
  Ingress,
  Label,
  ErrorMessage,
} from "..";

export default {
  title: "ds-react/typography",
  component: BodyLong,
};

const lorem = () => <>Veniam consequat cillum pariatur officia duis</>;

const TitleTemplate = ({ level, size, spacing }) => (
  <Heading spacing={spacing} size={size} level={level}>
    {lorem()}
  </Heading>
);

export const HeadingStory = TitleTemplate.bind({});
HeadingStory.args = { level: 1, size: "xlarge", spacing: false };

const IngressTemplate = ({ spacing }) => (
  <Ingress spacing={spacing}>{lorem()}</Ingress>
);

export const IngressStory = IngressTemplate.bind({});
IngressStory.args = { spacing: false };

const BodyLongTemplate = ({ spacing, size }) => (
  <BodyLong size={size} spacing={spacing}>
    {lorem()}
  </BodyLong>
);

export const BodyLongStory = BodyLongTemplate.bind({});
BodyLongStory.args = { spacing: false, size: "medium" };

const BodyShortTemplate = ({ spacing, size }) => (
  <BodyShort size={size} spacing={spacing}>
    {lorem()}
  </BodyShort>
);

export const BodyShortStory = BodyShortTemplate.bind({});
BodyShortStory.args = { spacing: false, size: "medium" };

const LabelTemplate = ({ spacing, size }) => (
  <Label size={size} spacing={spacing}>
    {lorem()}
  </Label>
);

export const LabelStory = LabelTemplate.bind({});
LabelStory.args = { spacing: false, size: "medium" };

const DetailTemplate = ({ spacing, size }) => (
  <Detail size={size} spacing={spacing}>
    {lorem()}
  </Detail>
);

export const DetailStory = DetailTemplate.bind({});
DetailStory.args = { spacing: false, size: "medium" };

const ErrorMessageTemplate = ({ size }) => (
  <ErrorMessage size={size}>{lorem()}</ErrorMessage>
);

export const ErrorMessageStory = ErrorMessageTemplate.bind({});
ErrorMessageStory.args = { size: "medium" };

export const SideInnholdEksempel = () => {
  return (
    <div style={{ maxWidth: 600 }}>
      <Heading level={"1"} size="xlarge" spacing>
        Title lvl 1 xlarge
      </Heading>
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
      <BodyLong spacing>
        BodyLong: Dolore commodo ad veniam commodo aute voluptate est officia
        sunt proident irure consectetur excepteur.
      </BodyLong>
      <Heading level={"2"} size="xlarge" spacing>
        Title lvl 2 large
      </Heading>
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
      <BodyLong size="small" spacing>
        BodyLong small: Irure dolore laborum amet occaecat ex laboris mollit
        reprehenderit nisi laborum voluptate laborum. Ipsum eu sint laborum
        adipisicing ut incididunt laborum laborum. Ipsum non amet laboris quis
        Lorem est laborum qui pariatur ex eu. Eiusmod proident amet esse ex.
      </BodyLong>
      <BodyShort spacing>
        BodyShort: Id consectetur velit sunt laboris consequat ullamco
        incididunt.
      </BodyShort>
      <BodyShort size="small" spacing>
        BodyShort small: Sunt amet officia sit excepteur sit pariatur sit
        reprehenderit irure ipsum.
      </BodyShort>
    </div>
  );
};
