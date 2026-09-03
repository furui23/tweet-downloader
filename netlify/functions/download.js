// Download proxy endpoint for direct media download
// This bypasses CORS restrictions by fetching media server-side and streaming it to the client

const JSON_CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

exports.handler = async (event) => {
  const url = event.queryStringParameters?.url;
  
  if (!url) {
    return {
      statusCode: 400,
      headers: JSON_CORS,
      body: JSON.stringify({ error: 'URL parameter is required' }),
    };
  }

  try {
    // Fetch the media from the source URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'XGrab/1.0 (media downloader proxy)',
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: JSON_CORS,
        body: JSON.stringify({ error: `Failed to fetch media: ${response.status}` }),
      };
    }

    // Get content type and content length
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const contentLength = response.headers.get('content-length');
    const contentTypeForDownload = contentType.includes('image') ? contentType : 'application/octet-stream';

    // Read the body as array buffer
    const buffer = await response.arrayBuffer();
    
    // Return with appropriate headers for download
    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentTypeForDownload,
        'Content-Length': contentLength || buffer.byteLength.toString(),
        'Content-Disposition': `attachment; filename="media.${contentType.includes('image') ? 'jpg' : contentType.includes('video') ? 'mp4' : contentType.includes('audio') ? 'mp3' : 'bin'}"`,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      },
      body: Buffer.from(buffer).toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: JSON_CORS,
      body: JSON.stringify({ error: 'Download failed', details: error.message }),
    };
  }
};
