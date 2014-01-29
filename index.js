var fs = require("fs");
var mkdirp = require("mkdirp");

var LOG_DIR = "./logs/";

function leadingZero(N) {
	return N < 10 ? ("0" + N) : N;
}

function makeTimeStamp(date) {
	return date.getFullYear() + "-" + leadingZero(date.getMonth() + 1) + "-" + leadingZero(date.getDay() + 1) + "T" + leadingZero(date.getHours()) + ":" + leadingZero(date.getMinutes()) + ":" + leadingZero(date.getSeconds()) + ":" + date.getMilliseconds();
}

module.exports = function(opts) {
	opts = opts || {};
	if (opts.dir) {
		LOG_DIR = opts.dir;
	}

	var record = {
		start_time: new Date(),
		data: {}
	};

	record.reinitialize = function() {
		record.start_time = (new Date()).getTime();
	};

	record.write = function(filename) {
		if (LOG_DIR[LOG_DIR.length-1] != "/") {
			LOG_DIR += "/";
		}

		if (!filename) {
			filename = LOG_DIR + record.start_time.getTime() + ".json";
		}

		record.end_time = new Date();
		record.elapsed = {
			ms: record.end_time.getTime() - record.start_time.getTime()
		};
		record.elapsed.s = (record.elapsed.ms / 1000).toFixed(2);
		record.elapsed.m = (record.elapsed.s / 60).toFixed(2);
		record.elapsed.h = (record.elapsed.m / 60).toFixed(2);

		record.start_time = makeTimeStamp(record.start_time);
		record.end_time = makeTimeStamp(record.end_time);



		mkdirp(LOG_DIR, function(err) {
			if (err) {
				console.log(err);
			} else {
				fs.writeFileSync(filename, JSON.stringify(record, null, 2));			
			}
		});
	};

	return record;
};

module.exports.setLogDir = function(d) {
	LOG_DIR = d;
	return this;
};