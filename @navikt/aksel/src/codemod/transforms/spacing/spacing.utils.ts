/**
 * Maps old spacing-token values to new space-tokens
 */
const legacySpacingTokenMap = new Map<string, string>([
  ["32", "128"],
  ["24", "96"],
  ["20", "80"],
  ["18", "72"],
  ["16", "64"],
  ["14", "56"],
  ["12", "48"],
  ["11", "44"],
  ["10", "40"],
  ["9", "36"],
  ["8", "32"],
  ["7", "28"],
  ["6", "24"],
  ["5", "20"],
  ["4", "16"],
  ["3", "12"],
  ["2", "8"],
  ["1-alt", "6"],
  ["1", "4"],
  ["05", "2"],
  ["0", "0"],
]);

function convertSpacingToSpace(spacing: string): string | null {
  return legacySpacingTokenMap.get(spacing) || null;
}

export { convertSpacingToSpace, legacySpacingTokenMap };
