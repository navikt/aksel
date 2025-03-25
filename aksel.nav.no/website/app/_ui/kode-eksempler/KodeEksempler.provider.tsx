"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
  };
};

const KodeEksemplerContext = createContext<KodeEksemplerContextT | null>(null);

function KodeEksemplerProvider(props: {
  children: React.ReactNode;
  value: ExtractPortableComponentProps<"kode_eksempler">["value"];
}) {
  const { dir } = props.value;
  const { children } = props;

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeExample, setActiveExample] = useState<FileT | null>(
    dir?.filer?.[0] ?? null,
  );

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("demo", value);

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

    setActiveExample(foundExample);

    const id = nameToId(dir?.title ?? "", exampleName);
    router.push(pathname + "?" + createQueryString(id));
  };

  useEffect(() => {
    const param = searchParams?.get("demo");
    if (!param) {
      return;
    }

    const foundMatch = dir?.filer?.find((file) => {
      const id = nameToId(dir?.title ?? "", file.navn ?? "");
      return param === `${id}`;
    });

    if (foundMatch) {
      setActiveExample(foundMatch);
    }
  }, [dir?.filer, dir?.title, searchParams]);

  return (
    <KodeEksemplerContext.Provider
      value={{
        activeExample: {
          current: activeExample,
          update: updateActiveExample,
        },
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
