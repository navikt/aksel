import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { landingsider, previews } from "../../config";

export const Feedback = defineType({
  title: "Feedback",
  name: "aksel_feedback",
  type: "document",
  liveEdit: true,
  __experimental_omnisearch_visibility: false,
  fields: [
    defineField({
      title: "Type feedback",
      name: "feedback_type",
      readOnly: true,
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Generell (footer)", value: "footer" },
          { title: "Fant du det du lette etter?", value: "artikkel_feedback" },
          { title: "uu-feedback", value: "uu_feedback" },
        ],
      },
    }),
    defineField({
      title: "Fant du det du lette etter?",
      name: "artikkel_feedback",
      readOnly: true,
      hidden: ({ parent }) => parent.feedback_type !== "artikkel_feedback",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Ja", value: "ja" },
          { title: "Nei", value: "nei" },
          { title: "Forslag", value: "forslag" },
        ],
      },
    }),
    defineField({
      title: "Melding",
      name: "melding",
      type: "text",
      readOnly: true,
    }),
    defineField({
      title: "URL",
      name: "url",
      type: "string",
      readOnly: true,
    }),
    defineField({
      title: "Dokument-ref",
      name: "doc_ref",
      type: "reference",
      weak: true,
      hidden: ({ value }) => !value,
      to: [...previews, "aksel_tema", ...landingsider.map((x) => x.name)].map(
        (x) => ({ type: x })
      ),
      readOnly: true,
    }),
    defineField({
      title: "Notater",
      description:
        "Legg til notater hvis det var noen tanker/aksjonspunkter basert på tilbakemeldingen",
      name: "notat",
      type: "text",
    }),
    defineField({
      title: "Behandlet",
      description: "Tagger tilbakemeldingen som sett/tatt rede for/ferdig",
      name: "behandlet",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      melding: "melding",
      behandlet: "behandlet",
      url: "url",
      feedback_type: "feedback_type",
      artikkel_feedback: "artikkel_feedback",
      title: "doc_ref.heading",
    },
    prepare(selection) {
      const { melding, url, behandlet, feedback_type, title } = selection;

      return {
        title: melding ? melding : title ? title : url ? url : "",
        subtitle: `${behandlet ? "Ferdig behandlet" : "Ubehandlet"} | ${
          feedback_type === "footer"
            ? "footer"
            : feedback_type === "artikkel_feedback"
            ? "Innhold"
            : "uu-feedback"
        }`,
        media: CommentIcon,
      };
    },
  },
});
