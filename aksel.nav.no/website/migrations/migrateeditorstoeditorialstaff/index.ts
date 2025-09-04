import { uuid } from "@sanity/uuid";
import { config } from "dotenv";
import { createClient } from "next-sanity";
import { resolve } from "path";
import { at, defineMigration, set } from "sanity/migrate";
import { clientConfig } from "@/sanity/config";

const to_migrate = ["aksel_artikkel", "aksel_blogg"];

const dupes = new Set<string>();

// Fetch all editorial_staff data upfront and build the mapping
const editorToEditorialStaffMap = new Map<string, string[]>();

// Load .env file from two folders up
config({ path: resolve(process.cwd(), "../../.env") });

(async () => {
  const client = createClient({
    ...clientConfig,
    dataset: "development",
    token: process.env.SANITY_READ,
  });

  console.log("Fetching all editorial_staff documents...");

  const editorialStaffDocs = await client.fetch(`
    *[_type == "editorial_staff"] {
      _id,
      "legacy_contributors": legacy_contributors[]._ref
    }
  `);

  console.log(editorialStaffDocs);

  // Build the editor -> editorial_staff mapping in memory
  editorialStaffDocs.forEach((editorialStaff) => {
    if (!editorialStaff.legacy_contributors) {
      return;
    }

    editorialStaff.legacy_contributors.forEach((contributorRef) => {
      if (!editorToEditorialStaffMap.has(contributorRef)) {
        editorToEditorialStaffMap.set(contributorRef, [editorialStaff._id]);
        return;
      }
      const existing = editorToEditorialStaffMap.get(contributorRef);

      if (existing) {
        existing.push(editorialStaff._id);
      }
    });
  });

  console.log(
    `Built mapping for ${
      Object.keys(editorToEditorialStaffMap).length
    } editors -> editorial_staff`,
  );
  console.log(editorToEditorialStaffMap);
})();

// Define the migration with the pre-loaded data
export default defineMigration({
  title: "migrateEditorsToEditorialStaff",
  documentTypes: to_migrate,
  migrate: {
    document(doc, context) {
      // Only process documents that have a contributors field (the old editorField)
      if (
        !doc.contributors ||
        !Array.isArray(doc.contributors) ||
        doc.contributors.length === 0
      ) {
        return;
      }

      // Get all editor IDs from the contributors array
      const editorIds = doc.contributors
        .filter(
          (contributor) =>
            contributor._type === "reference" && contributor._ref,
        )
        .map((contributor) => contributor._ref) as string[];

      if (editorIds.length === 0) {
        return;
      }

      // Create new writers array with editorial_staff references
      const newWriters = [];
      const processedEditorialStaff = new Set();

      // Preserve any existing writers that are already editorial_staff references
      /* if (doc.writers && Array.isArray(doc.writers)) {
        doc.writers.forEach((writer) => {
          if (writer._type === "reference" && writer._ref) {
            newWriters.push(writer);
            processedEditorialStaff.add(writer._ref);
          }
        });
      } */

      // Map contributors (editors) to editorial_staff using our pre-built mapping
      editorIds.forEach((contributor_ref) => {
        const editorialStaffIdArray =
          editorToEditorialStaffMap.get(contributor_ref);

        if (editorialStaffIdArray === undefined) {
          throw new Error(
            `No editorial_staff found for contributor_ref: ${contributor_ref}`,
          );
        }

        /* TODO: Handle after */
        if (editorialStaffIdArray.length > 1) {
          console.info("Duplicated id:", doc._id);
          dupes.add(doc._id);
          return;
        }

        const staffId = editorialStaffIdArray[0];

        if (!processedEditorialStaff.has(staffId)) {
          // Add editorial_staff reference (avoid duplicates)
          newWriters.push({
            _type: "reference",
            _ref: staffId,
            _key: uuid(),
          });
          processedEditorialStaff.add(staffId);
        }
      });

      // Apply patch if we found matching editorial_staff documents
      if (newWriters.length > 0) {
        /* console.log(
          `Migrating document ${doc._id}: Found ${doc.contributors.length} contributors -> Setting ${newWriters.length} writers (editorial_staff)`,
        ); */
        console.info([...dupes.keys()]);
        console.info("Total dupes:", dupes.size);
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        console.info("\n\n\n");
        return at("writers", set(newWriters));
      }
    },
  },
});
