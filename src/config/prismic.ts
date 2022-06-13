import * as prismic from '@prismicio/client';

const endpoint = prismic.getRepositoryEndpoint('system-app');
const client = prismic.createClient(endpoint);

export const prismicInit = () => {
    return client;
}
