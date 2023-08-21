const file_key = "wEdyFjCQSBR3U7FvrMbPXa";

export const fetchIcons = async () => {
  const data = await fetch(
    `https://api.figma.com/v1/files/${file_key}/components`,
    {
      headers: {
        "Content-type": "application/json",
        "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN,
      },
    }
  )
    .then((x) => x.json())
    .catch((e) => {
      throw e.message;
    });

  if (!data?.meta?.components || data?.meta?.components.length === 0) {
    throw new Error("Fant ingen publiserte ikoner");
  }

  return data?.meta?.components;
};

export const fetchDownloadUrls = async (idArray) => {
  const urls = { images: null };

  for (let ids of idArray) {
    await fetch(
      `https://api.figma.com/v1/images/${file_key}/?ids=${ids}&format=svg`,
      {
        headers: {
          "Content-type": "application/json",
          "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN,
        },
      }
    )
      .then((x) => x.json())
      .then((x) => {
        urls.images = {
          ...urls.images,
          ...x.images,
        };
      })
      .catch((e) => {
        throw e.message;
      });
  }
  return urls;
};

export const fetchIcon = async (url) => {
  return await fetch(url)
    .then((x) => x.text())
    .catch((e) => {
      console.log("Error fetching icon: ", e.message);
      throw e.message;
    });
};
