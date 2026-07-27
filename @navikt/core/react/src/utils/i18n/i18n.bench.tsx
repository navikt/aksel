import { renderHook } from "@testing-library/react";
import React from "react";
import { bench, describe } from "vitest";
import { Provider } from "../../provider";
import { get } from "./get";
import { useI18n } from "./i18n.hooks";
import type { PartialTranslations } from "./i18n.types";
import { nb } from "./locales";

describe("translate function throughput", () => {
  const { result } = renderHook(() => useI18n("FileUpload"));

  bench("simple key lookup (no replacements)", () => {
    result.current("item.uploading");
  });

  bench("key lookup with replacements", () => {
    result.current("item.uploading", { name: "Test", count: 5 } as never);
  });
});

describe("translate with local overrides", () => {
  const local = {
    item: { uploading: "Hello {name}, you have {count} files" },
  };
  const { result } = renderHook(() => useI18n("FileUpload", local));

  bench("local override with replacements", () => {
    result.current("item.uploading", { name: "Test", count: 5 });
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
  const { result } = renderHook(() => useI18n("FileUpload"), { wrapper });

  bench("hit in first context object", () => {
    result.current("dropzone.button");
  });

  bench("hit in second context object", () => {
    result.current("item.uploading");
  });

  bench("fallback to locale default", () => {
    result.current("item.downloading");
  });
});

describe("get() function throughput", () => {
  const objects: (PartialTranslations | undefined)[] = [
    undefined,
    { FileUpload: { item: { uploading: "First" } } },
    { FileUpload: { item: { downloading: "Second" } } },
    { FileUpload: nb.FileUpload },
  ];

  bench("shallow key hit in first object", () => {
    get("item.uploading", objects);
  });

  bench("key hit in second object (skip first)", () => {
    get("item.downloading", objects);
  });

  bench("deep fallback to last object", () => {
    get("dropzone.button", objects);
  });

  bench("long key dot notation parsing", () => {
    get("dropzone.dragAndDropMultiple", [{ FileUpload: nb.FileUpload }]);
  });
});
