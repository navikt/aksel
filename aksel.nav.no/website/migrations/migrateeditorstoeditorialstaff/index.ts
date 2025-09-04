import { config } from "dotenv";
import { createClient } from "next-sanity";
import { resolve } from "path";
import { at, defineMigration, set } from "sanity/migrate";
import { clientConfig } from "@/sanity/config";

const to_migrate = ["aksel_artikkel", "aksel_blogg"];

// Fetch all editorial_staff data upfront and build the mapping
const editorToEditorialStaffMap = {};

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
    if (editorialStaff.legacy_contributors) {
      editorialStaff.legacy_contributors.forEach((contributorRef) => {
        // Only use the first editorial_staff found for each editor
        if (!editorToEditorialStaffMap[contributorRef]) {
          editorToEditorialStaffMap[contributorRef] = editorialStaff._id;
        }
      });
    }
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
        .map((contributor) => contributor._ref);

      if (editorIds.length === 0) {
        return;
      }

      // Create new writers array with editorial_staff references
      const newWriters = [];
      const processedEditorialStaff = new Set();

      // Preserve any existing writers that are already editorial_staff references
      if (doc.writers && Array.isArray(doc.writers)) {
        doc.writers.forEach((writer) => {
          if (writer._type === "reference" && writer._ref) {
            newWriters.push(writer);
            processedEditorialStaff.add(writer._ref);
          }
        });
      }

      // Map contributors (editors) to editorial_staff using our pre-built mapping
      doc.contributors.forEach((contributor) => {
        if (contributor._type === "reference" && contributor._ref) {
          const editorialStaffId = editorToEditorialStaffMap[contributor._ref];

          if (
            editorialStaffId &&
            !processedEditorialStaff.has(editorialStaffId)
          ) {
            // Add editorial_staff reference (avoid duplicates)
            newWriters.push({
              _type: "reference",
              _ref: editorialStaffId,
              _key:
                contributor._key ||
                `editorial-staff-${Date.now()}-${Math.random()
                  .toString(36)
                  .substr(2, 9)}`,
            });
            processedEditorialStaff.add(editorialStaffId);
          }
        }
      });

      // Apply patch if we found matching editorial_staff documents
      if (newWriters.length > 0) {
        console.log(
          `Migrating document ${doc._id}: Found ${doc.contributors.length} contributors -> Setting ${newWriters.length} writers (editorial_staff)`,
        );
        return at("writers", set(newWriters));
      }
    },
  },
});
