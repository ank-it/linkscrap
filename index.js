var fs = require('fs');
var URL = require('url-parse');

var request = require('request');
var cheerio = require('cheerio');

var START_URL = "https://medium.com";
var MAX_PAGES_TO_VISIT = 100000;
var TIMEOUT = 5000;


var downloadedUrls = {};
var  totalUrlsVisited = 0;
var urlsToVisit = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;

// Method to download the Url and 
// push their contents to the 
// array of Urls to be visited.

function downloadUrl(url, callback) {
  downloadedUrls[url] = true;
   totalUrlsVisited++;

  console.log("Visiting page " + url);
  request(url, function(error, response, body) {
     if(response.statusCode !== 200) {
       callback();
       return;
     }
     var $ = cheerio.load(body);
     // Might be a blocking code. Depending upon the implementation by Cheerio.
     $('a').each(function (i, el) {
     	var urlString = $(el).attr('href');
     	var str = /^https?:\/\//i;
     	// Match only medium URLs to be scrapped next time.
			if (urlString.indexOf('https://medium.com') === 0)
			{
			    urlsToVisit.push(urlString);
			}
	  });
   	fs.appendFile( 'links.csv', '\n'+url, function (err) {
   		if (err) {
   			console.log('File error ');
   		}
   		callback();
		});
  });
}

// Method to start and execute the scrapping
function scrap() {
  if( totalUrlsVisited >= MAX_PAGES_TO_VISIT || urlsToVisit.length == 0) {
    console.log("Scrapping completed !");
    return;
  }
  var nextUrl = urlsToVisit.pop();
  if (nextUrl in downloadedUrls) {
    scrap();
  } else {
    setTimeout( downloadUrl(nextUrl, scrap), TIMEOUT);
  }
}

console.log("Starting the Crawler  1 ..2...3 " + START_URL);
urlsToVisit.push(START_URL);
scrap();

