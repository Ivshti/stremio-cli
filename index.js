#!/usr/bin/env node

var definition = require('./parser')(process.argv.slice(2))
var addons = require('stremio-addons')

var config = require('./stremio-conf')

var stremio = new addons.Client()

var add = function(x) { stremio.add(x) }
config.addons.core.forEach(add)
config.addons.extra.forEach(add)

if (! definition.name) {
	console.error('usage: stremio-cli <name>')
	process.exit(1)
}
console.log(definition)
