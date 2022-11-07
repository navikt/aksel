import dotenv from "dotenv";
import algoliasearch from "algoliasearch";
import { generateObjects } from "./index-objects";
dotenv.config();

const indexName = "aksel_search";

const index = async () => {
  const client = algoliasearch("J64I2SIG7K", process.env.ALGOLIA_ADMIN);

  const deployIndex = client.initIndex(indexName);

  const objects = await generateObjects();
  await deployIndex.clearObjects();

  await deployIndex.saveObjects(objects, {
    autoGenerateObjectIDIfNotExist: true,
  });

  console.log(`Records: ${objects.length}`);

  console.log("Finished indexing search");
};

index().catch((err) => {
  console.error(err);
});
