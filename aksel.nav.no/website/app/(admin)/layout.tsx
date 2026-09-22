import { connection } from "next/server";
import { Suspense } from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Suspense>
        <DynamicMarker />
      </Suspense>
    </>
  );
}

/* https://nextjs.org/docs/messages/blocking-prerender-metadata-runtime */
async function DynamicMarker() {
  await connection();
  return null;
}
