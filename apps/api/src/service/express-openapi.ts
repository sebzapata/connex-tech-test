import type { Express } from 'express';
import { initialize } from 'express-openapi';
import path from 'path';

const routesPath = path.resolve(__dirname, '..', 'paths');
console.log(routesPath);

export const expressOpenApi = async (app: Express) => {
  return await initialize({
    apiDoc: {
      info: {
        title: 'Connex Tech Test API',
        version: '0.0.1',
      },
      openapi: '3.1.0',
      paths: {},
    },
    app,
    promiseMode: true,
    paths: routesPath,
    routesGlob: '**/!(*.test).js',
    routesIndexFileRegExp: /(?:index)?\.js$/,
  });
};
