import { writeFileSync } from "node:fs";
import { analyzePackage } from "./analyze/analyzer.js";
import { analyzeBundleSizes } from "./analyze/bundler.js";
import { generateMarkdownReport } from "./report/generate-report.js";
import type { PackageBundleAnalysis, ReportData } from "./types.js";

const outputPath = "package-report.md";

main().catch((error) => {
  console.error("\n❌ Error:", error.message || error);
  console.error(error.stack);
  process.exit(1);
});

async function main() {
  const startTime = Date.now();

  console.info(`\nPackage Exports & Bundle Analyzer`);
  console.info(`  Package: @navikt/ds-react`);
  console.info(`  Output:  ${outputPath}`);
  console.info(`\nStep 1/3: Analyzing exports and types...`);

  const packageExports = await analyzePackage();

  console.info(`  Found ${packageExports.summary.totalPaths} export paths`);
  console.info(`  Found ${packageExports.summary.totalExports} exports`);
  console.info(`  Found ${packageExports.summary.totalTypes} types`);

  /* Step 2: Analyze bundle sizes */
  let bundleAnalysis: PackageBundleAnalysis | null = null;

  console.info(`\nStep 2/3: Analyzing bundle sizes...`);

  /* Determine paths to analyze */
  const pathsToAnalyze = packageExports.exportPaths.filter(
    (p) => !p.includes("types") && p !== "./package.json",
  );

  console.info(`  Analyzing ${pathsToAnalyze.length} paths...`);

  try {
    bundleAnalysis = await analyzeBundleSizes(packageExports, {
      paths: pathsToAnalyze,
    });

    const successCount = bundleAnalysis.details.filter(
      (d) => d.fullImport,
    ).length;
    const errorCount = bundleAnalysis.details.filter((d) => d.error).length;

    console.info(`  Analyzed ${successCount} paths successfully`);
    if (errorCount > 0) {
      console.info(`  ⚠ ${errorCount} paths had errors`);
    }
  } catch (error) {
    console.warn(`  ⚠️ Bundle analysis failed: ${error}`);
  }

  console.info(`\nStep 3/3: Generating report...`);

  const analysisDuration = Date.now() - startTime;

  const reportData: ReportData = {
    packageExports,
    bundleAnalysis,
    generatedAt: new Date().toISOString(),
    analysisDuration,
  };

  const markdown = generateMarkdownReport(reportData);

  // Write markdown
  writeFileSync(outputPath, markdown);
  console.info(`  Markdown report: ${outputPath}`);

  const jsonPath = outputPath.replace(/\.md$/, ".json");
  writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        packageExports,
        bundleAnalysis,
        generatedAt: reportData.generatedAt,
        analysisDuration,
      },
      null,
      2,
    ),
  );
  console.info(`  JSON data: ${jsonPath}`);

  console.info(
    `\n✅ Analysis complete in ${(analysisDuration / 1000).toFixed(1)}s`,
  );
}
