import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'qw695ie1',
    dataset: 'production',
    apiVersion: '2025-01-06',
    useCdn: false,
    token: import.meta.env.VITE_SANITY_TOKEN, // The token should not be passed as a query parameter
    withCredentials: true, // Ensure credentials are sent with requests
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
    if (!source || !source.asset?._ref) {
        console.error('Invalid image source:', source);
        return ''; // Return an empty string or a placeholder URL
    }
    return builder.image(source).url();
};