const path = require('path');
const fs = require('fs');
const resolve = require('enhanced-resolve');
const TransformPathResolvePlugin = require('../lib/index.js')


const myResolve = resolve.create({
    plugins: [new TransformPathResolvePlugin({
      pathReg: /^@lang/, // match path start with '@lang'
      transform: (filePath) => {
        if (filePath) {
          const realPath = filePath.replace('@lang', path.resolve(__dirname, './__mocks__/languages/cn'));
          if (fs.existsSync(realPath)) {
            return realPath;
          };
          return filePath.replace('@lang', path.resolve(__dirname, './__mocks__/languages/en'));
        }
      },
    }),
    ]
  });
  

  
describe("match file exists", () => {
    it('@lang/a.js should match to languages/cn/a.js', () => {
        return new Promise((resolve) => {
            myResolve(__dirname, '@lang/a.js', (err, ret) => {
                expect(ret).toMatch(/languages\/cn\/a.js/)
                resolve()
            })
        })
        
    })
});

describe("match file not exists transform to en/b.js", () => {
    it('@lang/a.js should match to languages/cn/b.js', () => {
        return new Promise((resolve) => {
            myResolve(__dirname, '@lang/b.js', (err, ret) => {
                expect(ret).toMatch(/languages\/en\/b.js/)
                resolve()
            })
        })
        
    })
});
  