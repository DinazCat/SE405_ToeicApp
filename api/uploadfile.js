const ipAddress = '192.168.1.102:3000';
const upImage = `http://${ipAddress}/upload`;
const upVideo = `http://${ipAddress}/uploadvideo`;
const upvideo2 = `http://${ipAddress}/uploadvideotoFirestore`;
// const upAudio = 'http://192.168.1.7:3000/uploadaudio'
const upPdf = `http://${ipAddress}/uploadpdf`;
const updoc = `http://${ipAddress}/uploaddoc`;
const upslide = `http://${ipAddress}/uploadppt`;
const API_KEY = 'AIzaSyAor3Lt0QmIYuT30ZMp3S6PaVyxW65bdfU'; //put your key here.
//this endpoint will tell Google to use the Vision API. We are passing in our key as well.
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
function generateBody(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'TEXT_DETECTION', //we will use this API for text detection purposes.
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
}
const callGoogleVisionAsync = async image => {
  const body = generateBody(image); //pass in our image for the payload
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log(result);
  const detectedText = result.responses[0].fullTextAnnotation;
  return detectedText
    ? detectedText
    : {text: "This image doesn't contain any text!"};
};

export default {
  upImage,
  upVideo,
  upPdf,
  callGoogleVisionAsync,
  updoc,
  upslide,
  upvideo2,
};
