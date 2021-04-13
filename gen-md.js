const j2md = require('jsdoc-to-markdown');
const fs = require('fs');
const { resolve } = require('path');
const output = resolve(__dirname, 'README.md');

j2md
  .render({
    files: resolve(__dirname, 'src/hooks/*.js')
  })
  .then((md) => {
    console.log(md);
    fs.writeFileSync(output, md);
  });
