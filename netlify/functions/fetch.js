const https = require('https');

const TWITTER_API = 'https://api.twitterfix.com/api/v1/tweet';
const JSON_CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error('Failed to parse JSON'));
        }
      });
    }).on('error', reject);
  });
}

exports.handler = async (event) => {
  const { queryParameters } = event;
  const url = queryParameters?.url;

  if (!url) {
    return { statusCode: 400, body: JSON.stringify({ error: 'URL parameter is required' }) };
  }

  try {
    const response = await fetchJSON(`${TWITTER_API}?url=${encodeURIComponent(url)}`);
    return { statusCode: 200, headers: JSON_CORS, body: JSON.stringify(response) };
  } catch (error) {
    return {
      statusCode: 502,
      headers: JSON_CORS,
      body: JSON.stringify({ error: 'Failed to fetch tweet data', details: error.message }),
    };
  }
};
