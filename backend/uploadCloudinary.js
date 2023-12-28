import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

export default function UploadCloudinary(imageLink, context) {
  return new Promise((resolve, reject) => {
    if (imageLink && context?.english && context?.prompt) {
      cloudinary.uploader.upload(
        imageLink,
        {
          context: {
            english: context.english,
            openai: context.prompt,
          },
          tags: 'spanish',
        },
        function (error, result) {
          if (error) {
            console.error('Error uploading to Cloudinary:', error);
            reject(error); // Reject the promise with the error
          } else {
            console.log('Cloudinary upload result:', result);
            resolve(result); // Resolve the promise with the result
          }
        }
      );
    } else {
      console.error('Invalid input data. Cannot upload to Cloudinary.');
      reject(new Error('Invalid input data')); // Reject the promise with an error
    }
  });
}