import * as app from '..';
import * as fastify from 'fastify';
import {Data} from './schemas/Data';
import {FromSchema} from 'json-schema-to-ts';
let packageData = require('../../package');
let queue = Promise.resolve();

export async function serverAsync(options: app.Options) {
  const server = fastify.default();
  server.route(get());
  server.route(post(options));
  await server.listen({host: '0.0.0.0', port: 8670});
}

function get(): fastify.RouteOptions {
  return {
    method: 'GET',
    url: '*',
    handler: (_, res) => res.send(`${packageData.name}:${packageData.version}`)
  };
}

function post(options: app.Options): fastify.RouteOptions {
  return {
    method: 'POST',
    url: '*',
    schema: {
      body: Data
    },
    handler: (req, res) => {
      const data = req.body as FromSchema<typeof Data>;
      enqueue(options, data.movieFile?.path);
      enqueue(options, data.series?.path);
      res.send();
    }
  };
}

function enqueue(options: app.Options, path?: string) {
  if (!path) return;
  queue = queue.then(() => app.actions.encodeAsync([path], options));
}
