import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, test } from "vitest";
import { HStack, VStack } from "../stack";
import { Box } from "./Box";

/**
 * Render-throughput benchmarks for the Box primitive.
 *
 * We use `renderToStaticMarkup` to measure the component render path itself
 * (responsive-style building, `omit`, `cl`, and the `Slot`/`BasePrimitive`
 * clone) in isolation, without jsdom DOM-mutation or effect-commit noise.
 *
 * Run with: `yarn workspace @navikt/ds-react test:bench Box`
 */

describe("Box – single element", () => {
  test("render throughput", async ({ bench }) => {
    await bench("bare (no props)", () => {
      renderToStaticMarkup(<Box>Hei</Box>);
    }).run();

    await bench("styling props only (background/border/radius/shadow)", () => {
      renderToStaticMarkup(
        <Box
          background="neutral-soft"
          borderColor="neutral-subtle"
          borderWidth="1"
          borderRadius="12"
          shadow="dialog"
        >
          Hei
        </Box>,
      );
    }).run();

    await bench("single responsive/primitive prop (padding)", () => {
      renderToStaticMarkup(<Box padding="space-16">Hei</Box>);
    }).run();

    await bench("many primitive props (padding/margin/width/position/inset)", () => {
      renderToStaticMarkup(
        <Box
          padding="space-16"
          margin="space-8"
          width="200px"
          maxWidth="400px"
          position="relative"
          inset="space-4"
        >
          Hei
        </Box>,
      );
    }).run();

    await bench("responsive object prop (padding per breakpoint)", () => {
      renderToStaticMarkup(
        <Box
          padding={{
            xs: "space-8",
            sm: "space-12",
            md: "space-16",
            lg: "space-20",
            xl: "space-24",
          }}
        >
          Hei
        </Box>,
      );
    }).run();

    await bench("asChild (Slot merge path)", () => {
      renderToStaticMarkup(
        <Box padding="space-16" asChild>
          <section>Hei</section>
        </Box>,
      );
    }).run();
  });
});

describe("Box – realistic tree (24 children)", () => {
  const children = Array.from({ length: 24 }, (_, i) => i);

  test("render throughput", async ({ bench }) => {
    await bench("VStack > Box grid of cards", () => {
      renderToStaticMarkup(
        <VStack gap="space-16">
          {children.map((i) => (
            <HStack key={i} gap="space-8" align="center">
              <Box padding="space-16" background="neutral-soft" borderRadius="8">
                Card {i}
              </Box>
            </HStack>
          ))}
        </VStack>,
      );
    }).run();
  });
});
