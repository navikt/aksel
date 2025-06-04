"use client";

import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";

export default function EndringsloggTableOfContents({ logEntries }) {
  const toc = logEntries.map((entry) => {
    const yearMonthTag = format(new Date(entry[0].endringsdato), "MMMM-yyy", {
      locale: nb,
    });
    const yearMonthBase = format(new Date(entry[0].endringsdato), "MMMM yyy", {
      locale: nb,
    });
    const yearMonth =
      yearMonthBase.charAt(0).toUpperCase() + yearMonthBase.slice(1);
    return {
      id: yearMonthTag,
      title: yearMonth,
    };
  });

  return (
    <TableOfContents
      feedback={{
        name: "Endringslogg",
        text: "Send innspill",
      }}
      showChangelogLink={true}
      toc={toc}
    />
  );
}
