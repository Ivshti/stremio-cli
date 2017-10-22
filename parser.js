var minimist = require('minimist')

module.exports = function(args) {
	var argv = minimist(args)

	var definition = {
		name: null,
		year: null
	}

	var name = [].concat(argv._)
	var last = name[name.length-1]

	if (typeof(last) === 'number' && last > 1960) {
		definition.name = name.slice(0, -1).join(' ')
		definition.year = last
	} else {
		definition.name = name.join(' ')
	}

	if (argv.season) definition.season = argv.season
	if (argv.episode) definition.episode = argv.episode

	definition.inApp = argv.inApp
	
	return definition
}

