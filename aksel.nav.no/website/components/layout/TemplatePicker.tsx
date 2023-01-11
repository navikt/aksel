import Error from "next/error";
import React from "react";
import { SanityT } from "@/lib";
import AkselArtikkelTemplate from "./page-templates/AkselArtikkel";
import AkselPrinsippTemplate from "./page-templates/AkselPrinsipp";

type aksel_artikkel = {
  aksel_artikkel: (props: {
    data: SanityT.Schema.aksel_artikkel;
    title: string;
  }) => JSX.Element;
};

type aksel_prinsipp = {
  aksel_prinsipp: (props: {
    data: SanityT.Schema.aksel_prinsipp;
    title: string;
  }) => JSX.Element;
};

type templateT = aksel_artikkel | aksel_prinsipp;

const templates: templateT = {
  aksel_artikkel: (props) => <AkselArtikkelTemplate {...props} />,
  aksel_prinsipp: (props) => <AkselPrinsippTemplate {...props} />,
};

const TemplatePicker = ({
  data,
  title,
}: {
  data: SanityT.Schema.aksel_artikkel | SanityT.Schema.aksel_prinsipp;
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
