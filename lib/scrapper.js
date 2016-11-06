
// TODO: Create methods here for downloading 
// page and addding timeout along with other 
// configurations

function Scrapper(options) {
	this.maxRequestPerSecond = options.maxRequestPerSecond;
	this.timeout = options.timeout;
	this.startUrl = options.startUrl;
	this.queuedUrls = [];
	this.crawledUrls = {};
} 

Scrapper.prototype.start = function() {
	this.queuedUrls.push(this.startUrl);
	this._processQueue(this.onFinish);
};


Scrapper.prototype._processQueue = function(onFinishHandler) {

	if (this.queuedUrls.length != 0) {
		var nextPage = this.queuedUrls.pop();
		if (nextPage in this.crawledUrls) {
			this._processQueue();
		} else {
			setTimeout( visitPage(nextPage, _processQueue), this.);
		}		
	}
	else {
		console.log('Finished Scrappig');
		onFinishHandler(null, crawledUrls);
	}
};

Scrapper.prototype.onFinish = function(error, result) {
	if (error) {
		console.log('Error : ' + error);
		return;
	}
	else {
		console.log('Finished Scrapping');
		return;
	}
};


Scrapper.prototype.getAllUrls = function() {
	return this.crawledUrls;
}

Scrapper.prototype.getQueuedUrls = function() {
	return this.queuedUrls;
}

module.exports = Scrapper;
