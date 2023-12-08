import { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { baseGpArticleData } from "@/layout/god-praksis-page/queries";
import { getClient } from "@/sanity/client.server";

export default async function gpAarticles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const page = Number(req.query.page);
  const innholdstype = req.query?.innholdstype?.toString?.() ?? "";
  const undertema = req.query?.undertema?.toString?.() ?? "";
  const tema = req.query?.tema?.toString?.() ?? "";

  if (!page && page !== 0) {
    return res
      .status(400)
      .json({ message: "Missing page param for pagination" });
  }

  const temaPageQuery = groq`
    {
      "articles": {
        $undertema == "" && $innholdstype == "" => {
          "articles": *[_type == 'aksel_artikkel' && $tema in undertema[]->tema->slug.current] | order(publishedAt desc)[$start...$end]${baseGpArticleData},
        },
        $undertema != "" && $innholdstype == "" => {
          "articles": *[_type == 'aksel_artikkel' && $tema in undertema[]->tema->slug.current && $undertema in undertema[]->title ] | order(publishedAt desc)[$start...$end]${baseGpArticleData},
        },
        $undertema == "" && $innholdstype != "" => {
          "articles": *[_type == 'aksel_artikkel' && $tema in undertema[]->tema->slug.current && $innholdstype == innholdstype->title ] | order(publishedAt desc)[$start...$end]${baseGpArticleData},
        },
        $undertema != "" && $innholdstype != "" => {
          "articles": *[_type == 'aksel_artikkel' && $tema in undertema[]->tema->slug.current && $undertema in undertema[]->title && $innholdstype == innholdstype->title ] | order(publishedAt desc)[$start...$end]${baseGpArticleData},
        }
      }
    }
  `;

  const mainPageQuery = groq`
    {
      "articles": {
        $innholdstype == "" => {
          "articles": *[_type == 'aksel_artikkel' ] | order(publishedAt desc)[$start...$end]${baseGpArticleData},
        },
        $innholdstype != "" => {
          "articles": *[_type == 'aksel_artikkel' && $innholdstype == innholdstype->title ] | order(publishedAt desc)[$start...$end]${baseGpArticleData},
        }
      }
    }
`;

  let payload;

  await getClient()
    .fetch(tema.length > 0 ? temaPageQuery : mainPageQuery, {
      start: page * 3,
      end: (page + 1) * 3,
      innholdstype,
      undertema,
      tema,
    })
    .then((data) => {
      /* TODO: Better way to do this query? */
      payload = data.articles.articles;
    })
    .catch((err) => {
      console.log("Error message: ", err.message);
      return res.status(500).json({ message: "Failed to load data" });
    });

  return res.status(200).json(payload);
}
