import { v2 as cloudinary } from "cloudinary";

export default function UploadCloudinary(imageLink, context) {
  return new Promise((resolve, reject) => {
    if (
      imageLink &&
      context?.english &&
      context?.prompt &&
      context?.infinitive
    ) {
      cloudinary.uploader.upload(
        imageLink,
        {
          context: {
            english: context.english,
            openai: context.prompt,
            spanish: context.infinitive,
          },
          tags: "spanish",
        },
        function (error, result) {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            reject(error); // Reject the promise with the error
          } else {
            console.log("Cloudinary upload result:", result);
            resolve(result); // Resolve the promise with the result
          }
        }
      );
    } else {
      console.error("Invalid input data. Cannot upload to Cloudinary.");
      reject(new Error("Invalid input data")); // Reject the promise with an error
    }
  });
}
