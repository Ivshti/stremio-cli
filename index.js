#!/usr/bin/env node

var definition = require('./parser')(process.argv.slice(2))
var addons = require('stremio-addons')

var config = require('./stremio-conf')

var stremio = new addons.Client()

var playStream = require('./playStream')

// Enable add-ons
var add = function(x) { stremio.add(x) }
config.addons.core.forEach(add)
config.addons.extra.forEach(add)

// Check args
if (! definition.name) dieWithErr('Usage: stremio-cli <name>')

// Do the work
function searchForMeta(def, cb)
{
	stremio.meta.search({ query: def.name, limit: 30 }, function(err, res) {
		if (err) return cb(err)
		if (! (res && Array.isArray(res.results))) return cb('no results from meta.search')

		var all = res.results
		if (definition.year) all = all.filter(function(x) { return x.year === definition.year })
		
		return cb(null, all)
	})
}

// Utils
function dieWithErr(err)
{
	console.error(err)
	process.exit(1)
}

// Main
searchForMeta(definition, function(err, meta) {
	if (err) dieWithErr(err)

	// TODO: allow to choose if results are ambiguous
	// perhaps check if name is exact match
	var first = meta[0]

	if (!first) dieWithErr('no meta found')
	
	var isExactMatch = first.name.toLowerCase() == definition.name
	
	// XXX Use stremio-models function streamQuery (from metadata)
	var q = {
		type: first.type,
		id: first.id
	}
	if (first.imdb_id) q.imdb_id = first.imdb_id

	stremio.stream.find({ query: q }, function(err, streams) {
		if (err) dieWithErr(err)
		
		if (! streams[0]) dieWtihErr('no stream found')
		playStream(streams[0])
	})
})
