import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_ACCESS_TOKEN,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

// Define type for image source, assuming it’s an object from Sanity image fields
export const urlFor = (source: object) => builder.image(source);
