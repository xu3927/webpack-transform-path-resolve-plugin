# Modify webpack resolve path by function

[中文文档](./README.CN.md)

This is a webpack resolve plugin, for transform resolve path by function.

## Example

Read different language config file for different version.

Directories as follow

```
- languages
    - en
        - a.js
        - b.js
    - cn
        - a.js
```

For example, if current lang is Chinese, then read file from directory `languages/cn`, if the file not exist, then read it from `languages/en`

a.js is exist, then `import Lang from @lang/a.js`, will resolve to `languages/cn/a.js`
b.js is not exist is Chinese, then `import Lang from @lang/b.js`, will resolve to `languages/en/b.js`

```js
const fs = require('fs')
const TransformPathResolvePlugin = require('webpack-transform-path-resolve-plugin');

const webpackConfig = {
    resolve: {
        plugins: [
          new TransformPathResolvePlugin({
            pathReg: /^@versions/,
            transform(filePath) {
                if (filePath) {
                const realPath = filePath.replace('@lang', path.resolve(__dirname, './__mocks__/languages/cn'));
                if (fs.existsSync(realPath)) {
                    return realPath;
                };
                return filePath.replace('@lang', path.resolve(__dirname, './__mocks__/languages/en'));
                }
            },
          }),
        ],
    }
}    
```