import { defineField, defineType } from "sanity";
import { LightBulbIcon } from "@navikt/aksel-icons";

export const Tips = defineType({
  name: "tips",
  title: "Tips",
  type: "object",
  icon: () => <LightBulbIcon aria-hidden />,
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
      <div className="space-y-1 bg-surface-alt-3-subtle p-2 dark:text-text-default">
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
