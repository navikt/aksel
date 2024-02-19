function PreviewBanner({ loading = true }: { loading: boolean }) {
  return (
    <a
      id="exit-preview-id"
      href={`/api/exit-preview?slug=${window.location.pathname}`}
      className="fixed left-0 top-2 z-[9999] w-72 -translate-x-24 translate-y-6 -rotate-45 bg-gray-900 p-1 text-center font-semibold text-text-on-inverted no-underline hover:bg-gray-700 focus:outline-none focus-visible:shadow-focus-inverted"
    >
      {loading ? <span>LASTER PREVIEW...</span> : <span>EXIT PREVIEW</span>}
    </a>
  );
}

export default PreviewBanner;
