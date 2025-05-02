// api/proxy.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const hfResponse = await fetch(
      'https://api-inference.huggingface.co/models/bigscience/bloom-560m',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify(req.body)
      }
    );
    const data = await hfResponse.json();
    res.status(hfResponse.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.toString() });
  }
}
