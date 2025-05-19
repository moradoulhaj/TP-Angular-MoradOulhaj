const express = require('express');
const path = require('path');

const app = express();
const PORT = 8085;

const LOCALES = ['fr-CA', 'en-US']; // add all your locales here

LOCALES.forEach((locale) => {
  // Correct path without src/
  const localePath = path.join(__dirname, 'dist', 'ecommerce-app', 'browser', locale);

  // Serve static files for each locale
  app.use(`/${locale}`, express.static(localePath));

  // Fallback to index.html for Angular routing
  app.get(`/${locale}`, (req, res) => {
    res.sendFile(path.join(localePath, 'index.html'));
  });

  app.get(`/${locale}/*`, (req, res) => {
    res.sendFile(path.join(localePath, 'index.html'));
  });
});

// Redirect root to default locale
app.get('/', (req, res) => {
  res.redirect('/en-US'); // or '/fr-CA' if you want French default
});

app.listen(PORT, () => {
  console.log(`🌍 Localized app available at:`);
  console.log(`➡️  http://localhost:${PORT}/fr-CA`);
  console.log(`➡️  http://localhost:${PORT}/en-US`);
});
