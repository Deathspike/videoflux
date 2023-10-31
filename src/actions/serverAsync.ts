import * as app from '..';
import * as fastify from 'fastify';
import {Data} from './schemas/Data';
import {FromSchema} from 'json-schema-to-ts';
import {Queue} from './classes/Queue';
const packageData = require('../../package');

export async function serverAsync(options: app.Options) {
  const queue = await Queue.createAsync('queue.json', createHandler(options));
  const server = fastify.default();
  server.route(get(queue));
  server.route(post(queue));
  await server.listen({host: '0.0.0.0', port: 8670});
}

function createHandler(options: app.Options) {
  return async (path: string) => {
    await app.actions.encodeAsync([path], options);
    if (!process.env['TORRENT']) return;
    await app.actions.torrentAsync([path]);
  };
}

function get(queue: Queue): fastify.RouteOptions {
  return {
    method: 'GET',
    url: '*',
    handler: (_, res) => {
      res.send({
        name: packageData.name,
        version: packageData.version,
        queue: queue.slice()
      });
    }
  };
}

function post(queue: Queue): fastify.RouteOptions {
  return {
    method: 'POST',
    url: '*',
    schema: {
      body: Data
    },
    handler: (req, res) => {
      const data = req.body as FromSchema<typeof Data>;
      queue.enqueue(data.movieFile?.path);
      queue.enqueue(data.series?.path);
      res.send();
    }
  };
}
