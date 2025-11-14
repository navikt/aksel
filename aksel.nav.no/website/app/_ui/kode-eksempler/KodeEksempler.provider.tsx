"use client";

import { stegaClean } from "next-sanity";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";

type FileT = NonNullable<
  NonNullable<
    ExtractPortableComponentProps<"kode_eksempler">["value"]["dir"]
  >["filer"]
>[number];

type KodeEksemplerContextT = {
  activeExample: {
    current: FileT | null;
    update: (name?: string) => void;
    loaded: boolean;
    updateLoaded: (loaded: boolean) => void;
  };
  showCode: boolean;
  toggleShowCode: () => void;
  compact: boolean;
  resizerRef: React.MutableRefObject<HTMLDivElement | null>;
  iframeRef: React.MutableRefObject<HTMLIFrameElement | null>;
};

const KodeEksemplerContext = createContext<KodeEksemplerContextT | null>(null);

function KodeEksemplerProvider(props: {
  children: React.ReactNode;
  value: ExtractPortableComponentProps<"kode_eksempler">["value"];
  compact?: boolean;
}) {
  const { dir } = props.value;
  const { children, compact = false } = props;

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const resizerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const prevSearchParam = useRef<string | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [showCode, setShowCode] = useState(!compact);

  // Derive active example from search params instead of storing in state
  const activeExample = useMemo(() => {
    const param = searchParams?.get("demo");
    if (!param) {
      return dir?.filer?.[0] ?? null;
    }

    const foundMatch = dir?.filer?.find((file) => {
      const id = nameToId(dir?.title ?? "", file.navn ?? "");
      return param === `${id}`;
    });

    return foundMatch ?? dir?.filer?.[0] ?? null;
  }, [dir?.filer, dir?.title, searchParams]);

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("demo", stegaClean(value));

      return params.toString();
    },
    [searchParams],
  );

  const updateActiveExample = (exampleName?: string) => {
    if (!exampleName) {
      return;
    }

    const foundExample = dir?.filer?.find((file) => file.navn === exampleName);

    if (!foundExample) {
      return;
    }

    setLoaded(false);

    const id = nameToId(dir?.title ?? "", exampleName);
    router.push(pathname + "?" + createQueryString(id), { scroll: false });
    iframeRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    const param = searchParams?.get("demo");
    if (!param || prevSearchParam.current === param) {
      return;
    }

    prevSearchParam.current = param;

    queueMicrotask(() => {
      iframeRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });

    iframeRef.current?.focus({ preventScroll: true });
  }, [searchParams]);

  return (
    <KodeEksemplerContext.Provider
      value={{
        activeExample: {
          current: activeExample,
          update: updateActiveExample,
          loaded,
          updateLoaded: setLoaded,
        },
        showCode,
        toggleShowCode: () => setShowCode((prev) => !prev),
        compact,
        resizerRef,
        iframeRef,
      }}
    >
      {children}
    </KodeEksemplerContext.Provider>
  );
}

function useKodeEksempler() {
  const context = useContext(KodeEksemplerContext);

  if (!context) {
    throw new Error(
      "useKodeEksempler must be used within a KodeEksemplerProvider",
    );
  }

  return context;
}

function nameToId(dir: string, name: string) {
  return `${dir?.toLowerCase()}demo-${name}`;
}

export { KodeEksemplerProvider, useKodeEksempler };
