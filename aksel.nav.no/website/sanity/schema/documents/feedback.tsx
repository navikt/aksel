import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { landingsider, previews } from "../../config";

export const Feedback = defineType({
  title: "Feedback",
  name: "aksel_feedback",
  type: "document",
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
      title: "Behandlet",
      name: "behandlet",
      type: "boolean",
      initialValue: false,
      /* readOnly: true, */
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
        "Legg til noen notater hvis det var noen aksjonspunkter basert på tilbakemeldingen",
      name: "notat",
      type: "text",
    }),
  ],
  preview: {
    select: {
      melding: "melding",
      behandlet: "behandlet",
      url: "url",
      feedback_type: "feedback_type",
      artikkel_feedback: "artikkel_feedback",
    },
    prepare(selection) {
      const { melding, url, behandlet, feedback_type, artikkel_feedback } =
        selection;

      return {
        title: melding ? melding : url ? url : "",
        subtitle: `${behandlet ? "Ferdig behandlet" : "Ubehandlet"} | ${
          feedback_type === "footer" ? "footer" : artikkel_feedback
        }`,
        media: CommentIcon,
      };
    },
  },
});
