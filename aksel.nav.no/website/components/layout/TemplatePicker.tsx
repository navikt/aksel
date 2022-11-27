import Error from "next/error";
import React from "react";
import { SanityT } from "@/lib";
import AkselArtikkelTemplate from "./page-templates/AkselArtikkel";
import AkselBloggTemplate from "./page-templates/AkselBlogg";
import ArtikkelTemplate from "./page-templates/Artikkel";
import KomponentArtikkelTemplate from "./page-templates/KomponentArtikkel";
import AkselPrinsippTemplate from "./page-templates/AkselPrinsipp";
import AkselStandaloneTemplate from "./page-templates/AkselStandalone";

type komponent_artikkel = {
  komponent_artikkel: (props: {
    data: SanityT.Schema.komponent_artikkel;
    title: string;
  }) => JSX.Element;
};

type ds_artikkel = {
  ds_artikkel: (props: {
    data: SanityT.Schema.ds_artikkel;
    title: string;
  }) => JSX.Element;
};

type aksel_artikkel = {
  aksel_artikkel: (props: {
    data: SanityT.Schema.aksel_artikkel;
    title: string;
  }) => JSX.Element;
};

type aksel_blogg = {
  aksel_blogg: (props: {
    data: SanityT.Schema.aksel_blogg;
    title: string;
  }) => JSX.Element;
};

type aksel_standalone = {
  aksel_standalone: (props: {
    data: SanityT.Schema.aksel_standalone;
    title: string;
  }) => JSX.Element;
};

type aksel_prinsipp = {
  aksel_prinsipp: (props: {
    data: SanityT.Schema.aksel_prinsipp;
    title: string;
  }) => JSX.Element;
};

type templateT =
  | komponent_artikkel
  | ds_artikkel
  | aksel_artikkel
  | aksel_blogg
  | aksel_standalone
  | aksel_prinsipp;

const templates: templateT = {
  komponent_artikkel: (props) => <KomponentArtikkelTemplate {...props} />,
  ds_artikkel: (props) => <ArtikkelTemplate {...props} />,
  aksel_artikkel: (props) => <AkselArtikkelTemplate {...props} />,
  aksel_blogg: (props) => <AkselBloggTemplate {...props} />,
  aksel_prinsipp: (props) => <AkselPrinsippTemplate {...props} />,
  aksel_standalone: (props) => <AkselStandaloneTemplate {...props} />,
};

const TemplatePicker = ({
  data,
  title,
}: {
  data:
    | SanityT.Schema.komponent_artikkel
    | SanityT.Schema.aksel_artikkel
    | SanityT.Schema.aksel_blogg
    | SanityT.Schema.aksel_standalone
    | SanityT.Schema.aksel_prinsipp;
  title: string;
}): JSX.Element => {
  if (!Object.keys(templates).includes(data?._type)) {
    console.warn(
      `${data?._type} does not have a valid template to use, please create one.`
    );

    return (
      <Error
        statusCode={404}
        title="Sanity-side mangler template, kontakt utvikler"
      />
    );
  }

  const Template = templates[data?._type];

  return <Template data={data} title={title} />;
};

export default TemplatePicker;
