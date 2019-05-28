// Routes

//cheerio and axios for scrapping

var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

// Linking mongo database

// GET route for index page.
module.exports = function (app) {

    app.get("/", function (req, res) {
        axios.get("https://starcraft2.com/en-us/news")
            .then(function (response) {
                // Then, we load that into cheerio and save it to $ for a shorthand selector
                var $ = cheerio.load(response.data);


                $(".blog_card-link").each(function (i, element) {
                    // Save an empty result 
                    var result = {};
                    // Add the url, headline and summary of every link, and save them as properties of the result object
                    result.url = $(this).attr("href");
                    result.headline = $(this)
                        .children(".blog_card")
                        .children(".blog_card-block")
                        .children(".blog_card-title")
                        .text();
                    result.summary = $(this)
                        .children(".blog_card")
                        .children(".blog_card-block")
                        .children(".blog_card-text")
                        .text();

                    // Create a new Article using the `result` object built from scraping
                    db.Article.create(result)
                        .then(function (dbArticle) {

                            // View the added result in the console
                            // console.log(dbArticle);
                        })
                        .catch(function (err) {
                            // If an error occurred, log it
                            console.log("error cb")
                            console.log(err);
                        });
                });

                db.Article.find({})
                    .populate("comment")
                    .then(function (dbArticle) {
                        // res.json(dbArticle);
                        res.render("index", { article: dbArticle })
                    })
                    .catch(function (err) {
                        console.log(err)
                    })

            });


    })

    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        // axios.get("https://starcraft2.com/en-us/news")
        //     .then(function (response) {
        //         // Then, we load that into cheerio and save it to $ for a shorthand selector
        //         var $ = cheerio.load(response.data);

        //         // Now, we grab every h2 within an article tag, and do the following:
        //         $(".blog_card-link").each(function (i, element) {
        //             // Save an empty result object
        //             var result = {};

        //             // Add the url, headline and summary of every link, and save them as properties of the result object
        //             result.url = $(this).attr("href");
        //             result.headline = $(this)
        //                 .children(".blog_card")
        //                 .children(".blog_card-block")
        //                 .children(".blog_card-title")
        //                 .text();
        //             result.summary = $(this)
        //                 .children(".blog_card")
        //                 .children(".blog_card-block")
        //                 .children(".blog_card-text")
        //                 .text();


        //             console.log(result)

        //             // Create a new Article using the `result` object built from scraping
        //             db.Article.create(result)
        //                 .then(function (dbArticle) {
        //                     // View the added result in the console
        //                     console.log(dbArticle);
        //                 })
        //                 .catch(function (err) {
        //                     // If an error occurred, log it
        //                     console.log(err);
        //                 });
        //         });

        //         // Send a message to the client
        //     });
    });
}

