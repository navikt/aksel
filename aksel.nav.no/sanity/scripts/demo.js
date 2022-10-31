/* eslint-disable no-console */
const SanityConfig = require("../sanity.json");
const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2021-03-25",
});

/* const fetchDocuments = () => client.fetch(`*[_id in path('_.groups.*')]`); */
/* .then((res) => userStore.getUsers(res))
.then((users) => users.filter((user) => user.isCurrentUser)); */

/* const fetchDocument = async () =>
  client.fetch(`*[_id == "drafts.bc1fd317-02bd-4c5b-bf93-703816aeb0c7"]`); */

const runDemo = async () => {
  const res = await client.fetch(`*[_type == "aksel_artikkel"]`);
  console.log(res.length);
  /* await client.create({}).then(() => console.log("ok")); */
};

runDemo().catch((err) => {
  console.error(err);
  process.exit(1);
});
