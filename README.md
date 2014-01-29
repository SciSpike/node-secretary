node-secretary
==============

Dead simple file logging for Node with automatic timestamps

One often needs to write logs to disk that record the time that elapsed between when a process started and completed. This little guy does that with minimal overhead.

#Installation

After cloning the repo, run `npm install` to install the dependencies, which consist only of the [mkdirp](https://github.com/substack/node-mkdirp) module.

#Usage

	var secretary = require("node-secretary");

	var log = secretary();

You can optionally pass an options object to secretary with a parameter `dir` that specificies the directory where files will be written. The default is "logs" in the current directory.

The object returned by `secretary()` has default properties `status` and `data` for use in storing information, but you're not obligated to use them. When you write your log to disk, this object will be serialized as a JSON object, so anything you put it in will end up in the output. 

There is also an automatically created `starttime` property with a timestamp indicating when the log was created. While it's probably wise to keep your records in the `data` object, but you'll be fine so long as you don't override the `starttime` property. You can reset it at any time with the `log.reinitialize()` command, which will not erase anything you've added to the object.

When you're finished, just call `log.write()`.

#Example

	var secretary = require("node-secretary");

	var log = secretary();

	log.data.count = 0;

	var timer = setInterval(function() {
		console.log("Incrementing...");
		log.data.count += 1;
		if (log.data.count >= 10) {
			clearInterval(timer);
			log.write();		
		}
	}, 50);

The output of this example, a JSON file stored in the `logs` directory with a UNIX timestamp as the filename, will look like this:

	{
	  "start_time": "2014-01-04T11:02:49:488",
	  "data": {
	    "count": 10
	  },
	  "end_time": "2014-01-04T11:02:50:23",
	  "elapsed": {
	    "ms": 535,
	    "s": "0.54",
	    "m": "0.01",
	    "h": "0.00"
	  }
	}

#Testing

Run `npm test`.