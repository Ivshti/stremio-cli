var child = require('child_process')
var open = require('open')

const config = require('./stremio-conf')

function playStream(stream)
{
	// XXX: use stremio-models .prepare
	if (stream.url) launchPlayer(stream.url)
	if (stream.externalUrl) open(stream.externalUrl)
	if (stream.infoHash) {
		var idx = 0
		if (typeof(stream.fileIdx)==='number') idx = stream.fileIdx
		var url = 'http://127.0.0.1:11470/'+stream.infoHash+'/'+idx
	
		launchPlayer(url)
	}
}

function launchPlayer(url) 
{
	var p = child.spawn('/usr/bin/mpv',[url].concat(config.mpvOpts), {
		stdio: 'inherit'
	})
}

module.exports = playStream

