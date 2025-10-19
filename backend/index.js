const app = require('./server.js');

module.exports = (req, res) => {
  // Set CORS headers for preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Dynamically set the origin based on the request origin
    const origin = req.headers.origin;
    const allowedOrigins = [
      'http://localhost:8080',
      'http://localhost:5173',
      'https://base-nine-sage.vercel.app',
      'https://basse-khaki.vercel.app',
      'https://base-khaki.vercel.app'
    ];
    
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    res.status(200).end();
    return;
  }

  // For all other requests, also set the CORS headers dynamically
  res.setHeader('Access-Control-Allow-Credentials', true);
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:5173',
    'https://base-nine-sage.vercel.app',
    'https://basse-khaki.vercel.app',
    'https://base-khaki.vercel.app'
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // Pass the request to the Express app
  return app(req, res);
};