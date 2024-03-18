import { at, defineMigration, patch, unset } from "sanity/migrate";

export default defineMigration({
  title: "editor-id-to-mail",
  documentTypes: ["editor"],

  async *migrate(documents) {
    for await (const document of documents()) {
      yield patch(document._id, [
        at("anon_navn", unset()),
        at("user_id", unset()),
        at("roller", unset()),
        at("anonym", unset()),
      ]);
    }
  },
});
