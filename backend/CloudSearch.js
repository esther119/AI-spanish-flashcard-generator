import { v2 as cloudinary } from "cloudinary";

async function cloudinarySearch() {
  let outputs = {};

  try {
    const response = await cloudinary.search
      .expression("tags=spanish")
      .sort_by("created_at", "desc")
      .with_field("context")
      .max_results(100)
      .execute();

    const images = response.resources;

    // Loop through images and get context
    images.forEach((image) => {
      outputs[image.context.spanish] = image.url;
      // let pairs = [image.context.spanish, image.url]
      // outputs.push(pairs);
    });
  } catch (error) {
    console.error("Error:", error);
  }
  const outputlength = Object.keys(outputs).length;
  console.log("cloudinary display output length", outputlength);
  return outputs;
}

export default cloudinarySearch;
