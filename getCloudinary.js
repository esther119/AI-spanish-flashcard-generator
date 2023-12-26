import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: 'dbdfkyhov', 
  api_key: '867136646334634', 
  api_secret: 'kgCn3L32TU2lt_98kK8zRppHsuU' 
});

cloudinary.api
.resources({ public_id: 'context_dog', context: true, max_results: 1 })
.then(result => {
    if (result && result.resources && result.resources.length > 0) {
        const resource = result.resources[0];
        console.log('Resource:', resource); // Log the whole resource

        if (resource.context) {
            console.log('Context of the resource:', resource.context); // Log the context part of the resource
        } else {
            console.log('No context found for the resource');
        }
    } else {
        console.log('No resources found or result is undefined');
    }
})
.catch(error => console.error(error)); // Always good to handle potential errors
