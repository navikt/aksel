import createImageUrlBuilder from "@sanity/image-url";
import { SANITY_DATASET, SANITY_PROJECT_ID } from "@/sanity/config";

const imageBuilder = createImageUrlBuilder({
  projectId: SANITY_PROJECT_ID || "",
  dataset: SANITY_DATASET || "",
});

type Image = {
  asset?: {
    _ref: string;
  };
};

const urlForImage = (source: Image | null | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};

function urlForOpenGraphImage(image: Image | null | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit("crop").url();
}

export { urlForImage, urlForOpenGraphImage };
