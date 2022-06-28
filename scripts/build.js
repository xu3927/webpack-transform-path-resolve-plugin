const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ROOT_DIR = path.resolve(__dirname, '..')

// 更新 pkg.json 版本号
execSync(`npm version patch`, { encoding: 'utf-8', cwd: ROOT_DIR })

// 清空构建文件夹
execSync(`rm -rf ./lib/*`, { encoding: 'utf-8', cwd: ROOT_DIR })

// 编译 ts
execSync(`npx tsc -p ${path.resolve(__dirname, '../tsconfig.json')}`, { encoding: 'utf-8', cwd: ROOT_DIR })

