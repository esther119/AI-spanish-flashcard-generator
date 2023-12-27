import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.uploader.upload("https://replicate.delivery/pbxt/zTreN22DecueLIBu9VxHQjEfBmGuUCKeV2KyZAAi1SJlG2uQC/out-0.png",
{public_id: "context_dog", context: {'english': 'dog', 'sentence': 'I love dog', 'openai': 'draw a cute cute dog that I hold'} }, 
  function(error, result) {
    console.log(result, error);
  });