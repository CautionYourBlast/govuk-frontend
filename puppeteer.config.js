const { join } = require('path')

const { paths } = require('@cautionyourblast/config')

/**
 * @type {import('puppeteer').Configuration}
 */
module.exports = {
  cacheDirectory: join(paths.root, '.cache', 'puppeteer')
}
