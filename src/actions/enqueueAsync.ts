import * as app from '..';

export async function enqueueAsync(serverUrl: string, paths: Array<string>) {
  const headers = {'Content-Type': 'application/json'};
  const method = 'POST';
  const url = normalizeUrl(serverUrl);
  for (const path of paths) {
    try {
      app.logger.info(`Fetching ${path}`);
      const body = JSON.stringify({series: {path}});
      const response = await fetch(url, {body, headers, method});
      app.logger.info(`Finished ${path} (${response.statusText})`);
    } catch {
      app.logger.info(`Rejected ${path}`);
    }
  }
}

function normalizeUrl(serverUrl: string) {
  const hasProtocol = /^https?:\/\//i.test(serverUrl);
  const url = new URL(hasProtocol ? serverUrl : `http://${serverUrl}`);
  url.port ||= '8670';
  return url.toString();
}
