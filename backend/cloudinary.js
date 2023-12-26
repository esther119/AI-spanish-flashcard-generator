import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dbdfkyhov', 
  api_key: '867136646334634', 
  api_secret: 'kgCn3L32TU2lt_98kK8zRppHsuU' 
});

cloudinary.uploader.upload("https://replicate.delivery/pbxt/zTreN22DecueLIBu9VxHQjEfBmGuUCKeV2KyZAAi1SJlG2uQC/out-0.png",
{public_id: "context_dog", context: {'english': 'dog', 'sentence': 'I love dog', 'openai': 'draw a cute cute dog that I hold'} }, 
  function(error, result) {
    console.log(result, error);
  });