import { LightBulbIcon } from "@navikt/aksel-icons";
import { defineField, defineType } from "sanity";

export const Tips = defineType({
  name: "tips",
  title: "Tips",
  type: "object",
  icon: LightBulbIcon,
  fields: [
    defineField({
      title: "Innhold",
      name: "body",
      type: "riktekst_enkel",
      validation: (Rule) =>
        Rule.required().error("Tips-modul må ha noe innhold"),
    }),
  ],
  components: {
    preview: (values) => (
      <div className="bg-surface-alt-3-subtle space-y-1 p-2">
        <div className="flex items-center">
          <LightBulbIcon aria-hidden className="!text-xl" /> Tips
        </div>
        <div>{(values as any)?.body}</div>
      </div>
    ),
  },
  preview: {
    select: {
      body: "body",
    },
  },
});
