var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var movie = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('scrape', { title: 'scrape page' });

  url = 'http://projectfreetv.so/free/stargate-atlantis-season-2/';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var title, release, rating, episodeLink, videoLink;


            $('#content_box > h1 > span').filter(function(){
              var data = $(this);
              title = data.text();
              movie.title=title;
            });//end of title scraper

            $('#content_box > table > tbody > tr:nth-child(15) > th > div > a:nth-child(1)').filter(function(){
              var data=$(this);
              episodeLink=data.attr('href');
              movie.episodeLink=episodeLink;
            });
            console.log(movie)
        } else {
          console.log('there has been an error');
        } //end of if-else statement

    });//end of request

    // request(movie.episodeLink, function(err,res,html){
    //   if(!err){
    //     $('#mybox > table > tbody > tr:nth-child(3) > td:nth-child(1) > a').filter(function(){
    //       var videoLink;
    //       var data = $(this);
    //       videoLink=data.attr('href');
    //       console.log('video link:',videoLink);
    //       movie.videoLink=videoLink;
    //     });


    //   } else {
    //     console.log('there has been an error');
    //   }
    // });//end of video request
    res.send(movie);
});//end of router.get()

module.exports = router;
