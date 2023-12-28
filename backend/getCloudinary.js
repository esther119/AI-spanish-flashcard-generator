import { v2 as cloudinary } from 'cloudinary';

// cloudinary.api
// .resources({ public_id: 'context_dog', context: true, max_results: 1 })
// .then(result => {
//     if (result && result.resources && result.resources.length > 0) {
//         const resource = result.resources[0];
//         console.log('Resource:', resource); // Log the whole resource

//         if (resource.context) {
//             console.log('Context of the resource:', resource.context); // Log the context part of the resource
//         } else {
//             console.log('No context found for the resource');
//         }
//     } else {
//         console.log('No resources found or result is undefined');
//     }
// })
// .catch(error => console.error(error)); // Always good to handle potential errors

// Perform the search and handle the response with a promise
// function cloudinarySearch() {
//     let imageurls = []
//     let contexts = []
//     cloudinary.search.expression('tags=spanish')
//     .sort_by('public_id','desc')
//     .with_field('context')
//     .execute()
//     .then(response => {
//         const images = response.resources;

//         // Loop through images and get context
//         images.forEach(image => {
//             imageurls.push(image.url);
//             contexts.push(image.context);
//             console.log(image.context);
//             console.log(image.url);
//         });
//     })
//     .catch(error => console.error('Error:', error));
//     return [imageurls, contexts];
// }

// export default cloudinarySearch;

async function cloudinarySearch() {
    let outputs = {};

    try {
        const response = await cloudinary.search.expression('tags=spanish')
                                               .sort_by('created_at', 'desc')
                                               .with_field('context')
                                               .max_results(100)
                                               .execute();

        const images = response.resources;

        // Loop through images and get context
        images.forEach(image => {
            outputs[image.context.spanish]= image.url;
            // let pairs = [image.context.spanish, image.url]
            // outputs.push(pairs);
        });
    } catch (error) {
        console.error('Error:', error);
    }
    const outputlength = Object.keys(outputs).length;
    console.log("cloudinary display output length", outputlength)
    return outputs;
}

export default cloudinarySearch;


