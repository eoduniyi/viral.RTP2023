const apiKey = "PEXELS-API-KEY";

async function fetchBlueSkyImages() {
  const query = "city lights";
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&per_page=20`;

  const response = await fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching images: ${response.statusText}`);
  }

  const json = await response.json();
  console.log(json.photos); // Log the array of image objects
  return json.photos;
}

async function downloadImagesAsZip(images) {
  const zip = new JSZip();

  // Add each image to the zip folder
  const imagePromises = images.map(async (image, index) => {
    const imgResponse = await fetch(image.src.original);
    const imgBlob = await imgResponse.blob();
    zip.file(`image-${index + 1}.jpg`, imgBlob);
  });

  // Wait for all images to be added to the zip folder
  await Promise.all(imagePromises);

  // Generate the zip file and trigger the download
  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, "images.zip");
}

document
  .getElementById("downloadImages")
  .addEventListener("click", async () => {
    try {
      const images = await fetchBlueSkyImages();
      await downloadImagesAsZip(images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  });
