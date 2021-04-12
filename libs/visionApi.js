import axios from "axios";
const visionApiUrl = process.env["API_URL"];

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default async function detectHandWriting(file, maxResults = 10) {
  let imageBase64 = null;
  try {
    imageBase64 = await toBase64(file);
    imageBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
  } catch (error) {
    console.log(error);
    return null;
  }

  const options = {
    requests: [
      {
        image: {
          content: imageBase64,
        },
        features: [
          {
            type: "DOCUMENT_TEXT_DETECTION",
            maxResults,
          },
        ],
      },
    ],
  };
  try {
    const response = await axios.post(visionApiUrl, options);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}