import { createClient } from 'contentful';

const client = createClient({
  space: '8158bkxr2he7', // Replace with your Contentful space ID
  accessToken: 'nup7ERL6bzUzZ6na4hFIKXZ9xKgwGWviu6B7uSjPK6k' // Replace with your Contentful access token
});

export default client;
