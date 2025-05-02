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
    // Ensure inputs is an array, add wait_for_model so large models are ready
    const body = {
      inputs: Array.isArray(req.body.inputs) ? req.body.inputs : [req.body.inputs],
      options: { wait_for_model: true }
    };
    const hfResponse = await fetch(
      'https://api-inference.huggingface.co/models/bigscience/bloom-560m',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify(body)
      }
    );
    const data = await hfResponse.json();
    // Forward error messages from HF
    if (data.error) {
      return res.status(hfResponse.status).json({ error: data.error });
    }
    res.status(hfResponse.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.toString() });
  }
}
