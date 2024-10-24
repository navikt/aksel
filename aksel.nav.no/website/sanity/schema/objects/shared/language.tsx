import { defineField, defineType, useFormValue } from "sanity";
import { LanguageIcon } from "@navikt/aksel-icons";
import { SanityBlockContent } from "@/sanity-block";

export const Language = defineType({
  name: "language",
  title: "Språk",
  type: "object",
  icon: () => <LanguageIcon aria-hidden />,
  fields: [
    defineField({
      title: "Innhold",
      name: "body",
      type: "riktekst_enkel",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Språk",
      name: "language",
      type: "string",
      options: { list: [{ title: "Engelsk", value: "en" }] },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      body: "body",
      language: "language",
      arrayKey: "_key",
    },
  },
  components: {
    preview: (values: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const content: any = useFormValue(["content", { _key: values.arrayKey }]);

      return (
        <>
          {values.language && (
            <div className="float-right border px-1">
              lang={values.language}
            </div>
          )}
          {content?.body ? (
            <SanityBlockContent blocks={content.body} />
          ) : (
            <div>Tomt innhold eller kan ikke forhåndsvise</div>
          )}
        </>
      );
    },
  },
});
