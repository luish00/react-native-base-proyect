import app from './app.json';

const ENVIROMENTS = {
  dev: {
    url_api: 'http://dev.com',
  },
  prod: {
    url_api: 'http://prod.com',
  },
};

const ENV = () => {
  const { env } = app;

  return ENVIROMENTS[env] || ENVIROMENTS.dev;
};

export default ENV();
