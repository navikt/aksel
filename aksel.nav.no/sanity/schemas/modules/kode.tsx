import React from "react";

export default {
  title: "Kode",
  name: "kode",
  type: "object",
  icon: () => <div>{`<>`}</div>,
  fields: [
    {
      name: "code",
      title: "Kode",
      type: "code",
      hidden: ({ parent }) => parent?.variant,
      validation: (Rule) => Rule.required(),
      options: {
        languageAlternatives: [
          { value: "js", title: "Javascript" },
          { value: "jsx", title: "JSX" },
          { value: "html", title: "HTML" },
          { value: "css", title: "CSS" },
          { value: "less", title: "Less" },
          { value: "terminal", title: "Terminal/Bash" },
          { value: "terminal", title: "Standard" },
        ],
      },
    },
  ],
  preview: {
    select: {
      code: "code",
      ref: "ref.title",
    },
    prepare: ({ code, ref }) => ({
      title: code ? `${code?.code?.slice(0, 50)}...` : ref ? ref : "Kode",
      subtitle: "kode",
      media: () => <div>{`</>`}</div>,
    }),
  },
};
