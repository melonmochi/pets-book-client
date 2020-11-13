const host = process.env.FIREBASE_HOST || 'https://us-central1-clikalia-pets.cloudfunctions.net';

const getPetsUrl = (): string => {
  const insightsUrl = `${host}/pets`;
  return insightsUrl;
};

// eslint-disable-next-line import/prefer-default-export
export { getPetsUrl };
