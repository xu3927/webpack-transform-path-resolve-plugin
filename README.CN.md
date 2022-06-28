# 修改 webpack resolve 规则的插件

这是一个 Webpack 的 resolve 插件, 可以通过传入一个函数, 来修改 resolve 的规则

## 示例

如下文件目录

```
- languages
    - en
        - a.js
        - b.js
    - cn
        - a.js
```

从 languages 文件中读取对应语言的配置. 如果不存在该配置文件, 则回退到 en 目录
如, 当前语言版本为 CN,  
文件a.js 存在, `import Lang from @lang/a.js`, 则读取文件 `languages/cn/a.js`
文件b.js 存在, `import Lang from @lang/b.js`, 则读取文件 `languages/en/b.js`


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