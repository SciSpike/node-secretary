#!/usr/bin/env node

var secretary = require("../index");

var log = secretary({
	dir: __dirname + "/mylogs/"
});

log.data.count = 0;

// not a great idea to put custom data outside the "data" property, but it works
log.customAttr = "not a great idea";

var timer = setInterval(function() {
	console.log("Incrementing...");
	log.data.count += 1;
	if (log.data.count >= 10) {
		clearInterval(timer);
		log.write();		
	}
}, 50);

