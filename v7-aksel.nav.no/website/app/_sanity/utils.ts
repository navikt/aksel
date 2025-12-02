/* eslint-disable @typescript-eslint/no-unused-vars */
type Image = {
  asset?: {
    _ref: string;
  };
};

class LocalImageBuilder {
  source: Image;

  constructor(source: Image) {
    this.source = source;
  }

  auto(_: any) {
    return this;
  }
  fit(_: any) {
    return this;
  }
  width(_: any) {
    return this;
  }
  height(_: any) {
    return this;
  }
  quality(_: any) {
    return this;
  }
  format(_: any) {
    return this;
  }

  url() {
    const ref = this.source?.asset?._ref;
    if (!ref) return undefined;

    const parts = ref.split("-");
    if (parts.length < 2) return undefined;

    const ext = parts[parts.length - 1];
    const filename = parts.slice(1, parts.length - 1).join("-") + "." + ext;

    return `/sanity-assets/${filename}`;
  }
}

const urlForImage = (source: Image | null | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return new LocalImageBuilder(source);
};

export { urlForImage };
