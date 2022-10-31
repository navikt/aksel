import type { NextApiRequest, NextApiResponse } from "next";
import { HelpfulArticleT, HelpfulArticleEnum } from "@/lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "POST":
      try {
        const trelloKey = "c319bd921b9b1a9d8fb2d3c872c0134e";
        const trelloToken = process.env.TRELLO_TOKEN;

        if (!trelloKey || !trelloToken) {
          res.status(500).json({ msg: "Could not find needed tokens in .env" });
          return;
        }

        const data: HelpfulArticleT = JSON.parse(req.body);
        const sideUrl = "https://aksel.nav.no";

        /* Var denne artikkelen til hjelp? */
        const trelloList = "61d44fc3995604743a83f5cb";

        let label = "";
        switch (data.answer) {
          case HelpfulArticleEnum.JA:
            label = "61d44fd76c19645dd4d423ab";
            break;
          case HelpfulArticleEnum.DELVIS:
            label = "61d44fe8180b832f7c89c3d4";
            break;
          case HelpfulArticleEnum.NEI:
            label = "61d44fdeb5bfff71c69d619b";
            break;
          case HelpfulArticleEnum.MISC:
            label = "61d44ff4f92e56297e937af8";
            break;
          default:
            break;
        }

        const editUrl = `https://verktoykasse.sanity.studio/desk/__edit__${data.docId}%2Ctype%3D${data.docType}`;

        const card = `&name=${data.message}&desc=**Side:** %0A
        ${sideUrl + data.url} %0A
        **[Rediger side](${editUrl})**`;

        const url = `https://api.trello.com/1/cards?idList=${trelloList}&idLabels=${label}&key=${trelloKey}&token=${trelloToken}${card}`;

        const postRes = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        });

        if (!postRes.ok) {
          throw new Error(
            `request failed with status ${res.status}: ${await postRes.text()}`
          );
        }
        return res.json({ status: "ok" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error, check console" });
      }
      break;
  }
}
