var child = require('child_process')
var open = require('open')

function playStream(stream)
{
//	stream.prepare(function(err, vid) {
//		console.log(stream, vid)
//	})
	// XXX: use stremio-models .prepare
	if (stream.url) launchPlayer(stream.url)
	if (stream.externalUrl) open(stream.externalUrl)
	if (stream.infoHash) {
		var url = 'http://127.0.0.1:11470/'+stream.infoHash+'/'+stream.fileIdx
	
		launchPlayer(url)
	}
}

function launchPlayer(url) 
{
	child.spawn('/usr/bin/mpv',[url, '--fullscreen', '--force-window=immediate'])
}

module.exports = playStream

