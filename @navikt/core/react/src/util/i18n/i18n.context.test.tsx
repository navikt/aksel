import { renderHook } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import { Provider } from "../../provider";
import { useI18n } from "./i18n.context";
import en from "./locales/en";
import nb from "./locales/nb";

describe("useI18n", () => {
  test("should throw error if key is not found", () => {
    const { result } = renderHook(() => useI18n("FileUpload"));
    const translate = result.current;
    // @ts-expect-error - Testing nonexistent key
    expect(() => translate("item.nonexistentKey")).toThrowError();
  });

  test("should return the default NB translation when Provider is not used", () => {
    const { result } = renderHook(() => useI18n("FileUpload"));
    const translate = result.current;
    expect(translate("item.uploading")).toBe(nb.FileUpload.item.uploading);
  });

  test("should return the default translation when key is not in context object", () => {
    const i18n = { FileUpload: { item: { downloading: "Test translation" } } };
    const { result } = renderHook(() => useI18n("FileUpload"), {
      wrapper: ({ children }) => (
        <Provider locale={en} translations={i18n}>
          {children}
        </Provider>
      ),
    });
    const translate = result.current;
    expect(translate("item.uploading")).toBe(en.FileUpload.item.uploading);
  });

  test("should return the translated text from the context object", () => {
    const i18n = { FileUpload: { item: { uploading: "Test translation" } } };
    const { result } = renderHook(() => useI18n("FileUpload"), {
      wrapper: ({ children }) => (
        <Provider locale={en} translations={i18n}>
          {children}
        </Provider>
      ),
    });
    const translate = result.current;
    expect(translate("item.uploading")).toBe("Test translation");
  });

  test("should return the translated text from first context object", () => {
    const i18n1 = {
      FileUpload: { item: { uploading: "Correct translation" } },
    };
    const i18n2 = { FileUpload: { item: { uploading: "Wrong translation" } } };
    const { result } = renderHook(() => useI18n("FileUpload"), {
      wrapper: ({ children }) => (
        <Provider locale={en} translations={[i18n1, i18n2]}>
          {children}
        </Provider>
      ),
    });
    const translate = result.current;
    expect(translate("item.uploading")).toBe("Correct translation");
  });

  test("should return the translated text from second context object", () => {
    const i18n1 = { FileUpload: { item: { uploading: "Foo" } } };
    const i18n2 = {
      FileUpload: { item: { downloading: "Correct translation" } },
    };
    const { result } = renderHook(() => useI18n("FileUpload"), {
      wrapper: ({ children }) => (
        <Provider locale={en} translations={[i18n1, i18n2]}>
          {children}
        </Provider>
      ),
    });
    const translate = result.current;
    expect(translate("item.downloading")).toBe("Correct translation");
  });

  test("should return the translated text from first local object", () => {
    const i18n1 = { item: { uploading: "Correct translation" } };
    const i18n2 = { item: { uploading: "Wrong translation" } };
    const { result } = renderHook(() => useI18n("FileUpload", i18n1, i18n2));
    const translate = result.current;
    expect(translate("item.uploading")).toBe("Correct translation");
  });

  test("should return the translated text from second local object", () => {
    const i18n1 = { item: { uploading: "Foo" } };
    const i18n2 = { item: { downloading: "Correct translation" } };
    const { result } = renderHook(() => useI18n("FileUpload", i18n1, i18n2));
    const translate = result.current;
    expect(translate("item.downloading")).toBe("Correct translation");
  });

  test("should replace placeholders in the translated text", () => {
    const i18n = {
      item: { uploading: "Hello, {name}. You have {cnt} messages." },
    };
    const { result } = renderHook(() => useI18n("FileUpload", i18n));
    const translate = result.current;
    expect(translate("item.uploading", { name: "John", cnt: 3 })).toBe(
      "Hello, John. You have 3 messages.",
    );
  });

  test("should throw an error if replacement key is not found", () => {
    const i18n = { item: { uploading: "Hello, {name}" } };
    const { result } = renderHook(() => useI18n("FileUpload", i18n));
    const translate = result.current;
    expect(() => translate("item.uploading", { other: "John" })).toThrowError();
  });
});
