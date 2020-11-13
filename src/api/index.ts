const host = process.env.FIREBASE_HOST;

const getPetsUrl = (): string => {
  const insightsUrl = `${host}/pets`;
  return insightsUrl;
};

// eslint-disable-next-line import/prefer-default-export
export { getPetsUrl };
