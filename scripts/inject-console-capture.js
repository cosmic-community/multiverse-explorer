const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', '.next', 'server', 'app');
const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('dashboard-console-capture.js') && content.includes('</head>')) {
      content = content.replace('</head>', `${scriptTag}</head>`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Injected console capture script into ${filePath}`);
    }
  } catch (error) {
    console.error(`Failed to inject script into ${filePath}:`, error);
  }
}

function walkDir(dir) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.html')) {
        injectScript(filePath);
      }
    });
  } catch (error) {
    console.error(`Error walking directory ${dir}:`, error);
  }
}

if (fs.existsSync(outputDir)) {
  console.log('Injecting console capture script into HTML files...');
  walkDir(outputDir);
  console.log('Console capture script injection complete!');
} else {
  console.log('Build output directory not found. Skipping injection.');
}