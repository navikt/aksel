import dotenv from "dotenv";
import type { NextApiRequest, NextApiResponse } from "next";
import { FeedbackT } from "@/lib";
import { noCdnClient } from "../../lib/sanity/sanity.server";

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
        const token = process.env.SANITY_WRITE_KEY;

        if (!token && isDevelopment) {
          console.log("No token! api/feedback");
          return;
        }

        // this is our transactional client, it won't push anything until we say .commit() later
        const transactionClient = noCdnClient(token).transaction();
        const data: FeedbackT = JSON.parse(req.body);

        if (!data?.docId) {
          console.log("No docId! api/feedback");
          return;
        }
        const doc = {
          _id: `feedback.${randKey()}`,
          _type: "aksel_feedback",
          feedback_type:
            data.type === "footer" ? "footer" : "artikkel_feedback",
          ...(data.type === "footer" ? {} : { artikkel_feedback: data.type }),
          melding: data.message,
          behandlet: false,
          url: data.url,
          doc_ref: {
            _ref: data.docId,
            _type: "reference",
            _weak: true,
          },
        };

        transactionClient.create(doc);

        await transactionClient
          .commit()
          .then(() => console.log("Feedback-logged"))
          .catch((e) => console.error(e.message));

        return res.json({ status: "ok" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error, check console" });
      }
      break;
  }
}
