const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const expressStaticGzip = require('express-static-gzip');

app.use(express.json({ extended: false }));

// Serve the build files
const buildPath = path.join(__dirname, 'build');
app.use(
  '/',
  expressStaticGzip(buildPath, {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
  })
);

// Fallback to index.html when something that doesn't exist is requested
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));