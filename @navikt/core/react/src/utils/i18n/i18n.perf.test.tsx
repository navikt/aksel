import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { memo, useState } from "react";
import { describe, expect, test } from "vitest";
import { Provider } from "../../provider";
import { useI18n } from "./i18n.hooks";
import nb from "./locales/nb";

describe("useI18n referential stability", () => {
  /**
   * These tests document the DESIRED behavior after optimization.
   * They will FAIL until useI18n memoizes the translate function.
   */
  test.fails(
    "translate fn should be stable across re-renders when inputs unchanged",
    () => {
      const { result, rerender } = renderHook(() => useI18n("FileUpload"));
      const first = result.current;
      rerender();
      expect(result.current).toBe(first);
    },
  );

  test.fails(
    "translate fn should be stable when provider value unchanged",
    () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider>{children}</Provider>
      );
      const { result, rerender } = renderHook(() => useI18n("FileUpload"), {
        wrapper,
      });
      const first = result.current;
      rerender();
      expect(result.current).toBe(first);
    },
  );

  test.fails(
    "translate fn should be stable with local translations across re-renders",
    () => {
      const local = { item: { uploading: "Custom" } };
      const { result, rerender } = renderHook(() =>
        useI18n("FileUpload", local),
      );
      const first = result.current;
      rerender();
      expect(result.current).toBe(first);
    },
  );

  test("translate fn should update when translations change", async () => {
    function Consumer() {
      const t = useI18n("FileUpload");
      return <span data-testid="output">{t("item.uploading")}</span>;
    }

    function TestComponent() {
      const [translation, setTranslation] = useState("First");
      return (
        <Provider
          locale={nb}
          translations={{ FileUpload: { item: { uploading: translation } } }}
        >
          <button onClick={() => setTranslation("Second")}>change</button>
          <Consumer />
        </Provider>
      );
    }

    render(<TestComponent />);
    expect(screen.getByTestId("output").textContent).toBe("First");

    await userEvent.click(screen.getByText("change"));

    expect(screen.getByTestId("output").textContent).toBe("Second");
  });
});

describe("useI18n consumer re-renders", () => {
  /**
   * Documents that memo'd consumers still re-render because translate fn
   * identity changes. Will PASS once translate is memoized.
   */
  test.fails(
    "consumer should not re-render when parent re-renders with same provider value",
    async () => {
      let consumerRenderCount = 0;

      const Consumer = memo(function Consumer({
        translate,
      }: {
        translate: ReturnType<typeof useI18n<"FileUpload">>;
      }) {
        consumerRenderCount++;
        return <span>{translate("item.uploading")}</span>;
      });

      function Outer() {
        const [, setCount] = useState(0);
        const t = useI18n("FileUpload");
        return (
          <Provider>
            <button onClick={() => setCount((c) => c + 1)}>increment</button>
            <Consumer translate={t} />
          </Provider>
        );
      }

      render(<Outer />);
      expect(consumerRenderCount).toBe(1);

      await userEvent.click(screen.getByText("increment"));

      expect(consumerRenderCount).toBe(1);
    },
  );

  test("translate fn should produce correct results after provider value changes", async () => {
    function Consumer() {
      const t = useI18n("FileUpload");
      return <span data-testid="output">{t("item.uploading")}</span>;
    }

    function TestComponent() {
      const [lang, setLang] = useState<"nb" | "custom">("nb");
      return (
        <Provider
          locale={nb}
          translations={
            lang === "custom"
              ? { FileUpload: { item: { uploading: "Custom upload" } } }
              : undefined
          }
        >
          <button onClick={() => setLang("custom")}>switch</button>
          <Consumer />
        </Provider>
      );
    }

    render(<TestComponent />);
    expect(screen.getByTestId("output").textContent).toBe("Laster opp…");

    await userEvent.click(screen.getByText("switch"));

    expect(screen.getByTestId("output").textContent).toBe("Custom upload");
  });
});

describe("useI18n translation correctness after optimization", () => {
  test("translate returns correct value with no replacements", () => {
    const { result } = renderHook(() => useI18n("FileUpload"));
    expect(result.current("item.uploading")).toBe("Laster opp…");
  });

  test("translate handles replacements correctly", () => {
    const local = {
      item: { uploading: "Hello {name}, you have {count} files" },
    };
    const { result } = renderHook(() => useI18n("FileUpload", local));
    expect(result.current("item.uploading", { name: "John", count: 5 })).toBe(
      "Hello John, you have 5 files",
    );
  });

  test("translate falls through multiple objects correctly", () => {
    const i18n1 = { FileUpload: { dropzone: { button: "Override" } } };
    const i18n2 = { FileUpload: { item: { uploading: "Override2" } } };
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider locale={nb} translations={[i18n1, i18n2]}>
        {children}
      </Provider>
    );
    const { result } = renderHook(() => useI18n("FileUpload"), { wrapper });
    expect(result.current("dropzone.button")).toBe("Override");
    expect(result.current("item.uploading")).toBe("Override2");
    expect(result.current("item.downloading")).toBe("Laster ned…");
  });
});
