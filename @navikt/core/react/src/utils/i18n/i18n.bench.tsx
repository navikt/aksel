import { renderHook } from "@testing-library/react";
import React from "react";
import { describe, test } from "vitest";
import { Provider } from "../../provider";
import { get } from "./get";
import { useI18n } from "./i18n.hooks";
import type { ComponentTranslation } from "./i18n.types";
import { nb } from "./locales";

describe("translate function throughput", () => {
  test("translation lookups", async ({ bench }) => {
    const { result } = renderHook(() => useI18n("FileUpload"));

    await bench("simple key lookup (no replacements)", () => {
      result.current("item.uploading");
    }).run();

    await bench("key lookup with replacements", () => {
      result.current("item.uploading", { name: "Test", count: 5 } as never);
    }).run();
  });
});

describe("translate with local overrides", () => {
  const local = {
    item: { uploading: "Hello {name}, you have {count} files" },
  };

  test("local override lookup", async ({ bench }) => {
    const { result } = renderHook(() => useI18n("FileUpload", local));

    await bench("local override with replacements", () => {
      result.current("item.uploading", { name: "Test", count: 5 });
    }).run();
  });
});

describe("translate with multiple context objects", () => {
  const i18n1 = { FileUpload: { dropzone: { button: "Override" } } } as const;
  const i18n2 = { FileUpload: { item: { uploading: "Override2" } } } as const;
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider locale={nb} translations={[i18n1, i18n2]}>
      {children}
    </Provider>
  );

  test("context lookups", async ({ bench }) => {
    const { result } = renderHook(() => useI18n("FileUpload"), { wrapper });

    await bench("hit in first context object", () => {
      result.current("dropzone.button");
    }).run();

    await bench("hit in second context object", () => {
      result.current("item.uploading");
    }).run();

    await bench("fallback to locale default", () => {
      result.current("item.downloading");
    }).run();
  });
});

describe("get() function throughput", () => {
  const objects: (ComponentTranslation<"FileUpload"> | undefined)[] = [
    undefined,
    { item: { uploading: "First" } },
    { item: { downloading: "Second" } },
    nb.FileUpload,
  ];

  test("translation lookup", async ({ bench }) => {
    await bench("shallow key hit in first object", () => {
      get("item.uploading", objects);
    }).run();

    await bench("key hit in second object (skip first)", () => {
      get("item.downloading", objects);
    }).run();

    await bench("deep fallback to last object", () => {
      get("dropzone.button", objects);
    }).run();

    await bench("long key dot notation parsing", () => {
      get("dropzone.dragAndDropMultiple", [nb.FileUpload]);
    }).run();
  });
});
