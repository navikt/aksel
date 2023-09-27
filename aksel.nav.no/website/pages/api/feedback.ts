import { noCdnClient } from "@/sanity/client.server";
import { FeedbackT } from "@/types";
import dotenv from "dotenv";
import { logger } from "logger";
import type { NextApiRequest, NextApiResponse } from "next";

dotenv.config();

const isDevelopment = process.env.NODE_ENV === "development";

const randKey = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = 12;
  for (let i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "POST":
      try {
        res.status(405).json({ msg: "Feedback is temporarily disabled" });
        return;
        const token = process.env.SANITY_WRITE_KEY;

        if (!token && isDevelopment) {
          logger.info("No token! api/feedback");
          return;
        }

        // this is our transactional client, it won't push anything until we say .commit() later
        const transactionClient = noCdnClient(token).transaction();
        const data: FeedbackT = JSON.parse(req.body);

        const doc = {
          _id: `feedback.${randKey()}`,
          _type: "aksel_feedback",
          feedback_type: getType(data?.type),
          ...(["footer", "uu"].includes(data?.type)
            ? {}
            : { artikkel_feedback: data.type }),
          melding: data.message,
          behandlet: false,
          url: data.url,
          ...(data?.docId
            ? {
                doc_ref: {
                  _ref: data.docId,
                  _type: "reference",
                  _weak: true,
                },
              }
            : {}),
        };

        transactionClient.create(doc);

        await transactionClient
          .commit()
          .then(() => logger.info("Feedback-logged"))
          .catch((e) => logger.error(e.message));

        return res.json({ status: "ok" });
      } catch (err) {
        logger.error(err);
        res.status(500).json({ msg: "Error, check console" });
      }
      break;
  }
}

function getType(str: string) {
  switch (str) {
    case "footer":
      return "footer";
    case "uu":
      return "uu_feedback";
    default:
      return "artikkel_feedback";
  }
}
