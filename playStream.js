var child = require('child_process')

function playStream(stream)
{
	// XXX: use stremio-models .prepare
	if (stream.url) console.log(stream.url)
	if (stream.infoHash) {
		var idx = 0
		if (typeof(stream.mapIdx)==='number') idx = stream.mapIdx
		if (typeof(stream.fileIdx)==='number') idx = stream.fileIdx
		var url = 'http://127.0.0.1:11470/'+stream.infoHash+'/'+idx
		child.spawn('/usr/bin/mpv',[url])
	}
}

module.exports = playStream

