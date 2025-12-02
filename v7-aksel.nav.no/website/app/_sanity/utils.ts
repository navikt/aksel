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

  auto() {
    return this;
  }
  fit() {
    return this;
  }
  width() {
    return this;
  }
  height() {
    return this;
  }
  quality() {
    return this;
  }
  format() {
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

function urlForOpenGraphImage(image: Image | null | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit("crop").url();
}

export { urlForImage, urlForOpenGraphImage };
