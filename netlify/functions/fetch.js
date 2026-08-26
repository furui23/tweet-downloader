// Fetch tweet data from FxTwitter API (free, no auth required)
// API docs: https://github.com/FixTweet/FxTwitter
// Endpoint: https://api.fxtwitter.com/status/:id

const JSON_CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

exports.handler = async (event) => {
  const id = event.queryStringParameters?.id;

  if (!id || !/^\d+$/.test(id)) {
    return { statusCode: 400, headers: JSON_CORS, body: JSON.stringify({ error: 'Valid tweet ID required' }) };
  }

  try {
    const res = await fetch(`https://api.fxtwitter.com/status/${id}`, {
      headers: { 'User-Agent': 'XGrab/1.0 (media downloader)' },
    });

    const data = await res.json();

    if (data.code !== 200 || !data.tweet) {
      return {
        statusCode: 404,
        headers: JSON_CORS,
        body: JSON.stringify({ error: data.message || 'Tweet not found or unavailable' }),
      };
    }

    return { statusCode: 200, headers: JSON_CORS, body: JSON.stringify(data) };
  } catch (error) {
    return {
      statusCode: 502,
      headers: JSON_CORS,
      body: JSON.stringify({ error: 'Failed to fetch tweet', details: error.message }),
    };
  }
};
