var child = require('child_process')
var open = require('open')

function playStream(stream)
{
	// XXX: use stremio-models .prepare
	if (stream.url) launchPlayer(stream.url)
	if (stream.externalUrl) open(stream.externalUrl)
	if (stream.infoHash) {
		var idx = 0
		if (typeof(stream.mapIdx)==='number') idx = stream.mapIdx
		if (typeof(stream.fileIdx)==='number') idx = stream.fileIdx
		var url = 'http://127.0.0.1:11470/'+stream.infoHash+'/'+idx
	
		launchPlayer(url)
	}
}

function launchPlayer(url) 
{
	var p = child.spawn('/usr/bin/mpv',[url, '--fullscreen', '--force-window=immediate', '--msg-level=all=v'], {
		stdio: 'inherit'
	})
}

module.exports = playStream

