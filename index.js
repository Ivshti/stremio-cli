#!/usr/bin/env node

var definition = require('./parser')(process.argv.slice(2))

console.log(definition)
