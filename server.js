const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000; // Using port 5000 to match Replit's expectations

// URL rewriting middleware to handle clean URLs
app.use((req, res, next) => {
  // If URL ends with .html, redirect to the URL without .html
  if (req.path.endsWith('.html')) {
    const newPath = req.path.slice(0, -5); // Remove the .html extension
    return res.redirect(301, newPath);
  }
  next();
});

// Serve static files from the current directory with proper options
app.use(express.static(__dirname, {
  // Enable clean URLs by automatically serving index.html when a directory is requested
  index: 'index.html',
  // Hide extensions in URLs
  extensions: ['html']
}));

// Default route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle routes for all HTML pages without .html extension
app.get('/:page', (req, res, next) => {
  const pageName = req.params.page;
  // Skip for paths that have dots (likely files with extensions)
  if (pageName.includes('.')) {
    return next();
  }
  
  // Check if the HTML file exists
  const htmlFile = path.join(__dirname, `${pageName}.html`);
  const exists = require('fs').existsSync(htmlFile);
  
  if (exists) {
    return res.sendFile(htmlFile);
  }
  
  // Continue to next middleware if file doesn't exist
  next();
});

// Start the server - the 0.0.0.0 ensures the server is accessible externally
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Current directory: ${__dirname}`);
  console.log(`Visit: http://localhost:${port}/`);
});