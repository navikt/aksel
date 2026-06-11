export default async function GodPraksisLayout({
  children,
  endringslogg,
}: {
  children: React.ReactNode;
  endringslogg: React.ReactNode;
}) {
  return (
    <>
      {children}
      {endringslogg}
    </>
  );
}
