// This file ensures Tailwind can load the TypeScript config at runtime.
// It registers ts-node to transpile the .ts config on the fly.
require('ts-node').register({ transpileOnly: true })
module.exports = require('./tailwind.config.ts').default
