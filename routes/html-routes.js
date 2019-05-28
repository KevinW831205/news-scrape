// Routes

//cheerio and axios for scrapping

var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

// Linking mongo database

// GET route for index page.
module.exports = function (app) {

    app.get("/", function (req, res) {

        db.Article.find({})
            .populate("comment")
            .then(function (dbArticle) {
                console.log(dbArticle);
                console.log(dbArticle[0]);
                // res.json(dbArticle);
                res.render("index", { article: dbArticle })
            })
            .catch(function (err) {
                console.log(err)
            })
    })

    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        axios.get("https://starcraft2.com/en-us/news")
            .then(function (response) {
                // Then, we load that into cheerio and save it to $ for a shorthand selector
                var $ = cheerio.load(response.data);

                // Now, we grab every h2 within an article tag, and do the following:
                $(".blog_card-link").each(function (i, element) {
                    // Save an empty result object
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


                    console.log(result)

                    // Create a new Article using the `result` object built from scraping
                    db.Article.create(result)
                        .then(function (dbArticle) {
                            // View the added result in the console
                            console.log(dbArticle);
                        })
                        .catch(function (err) {
                            // If an error occurred, log it
                            console.log(err);
                        });
                });

                // Send a message to the client
                res.send("Scrape Complete");
            });
    });

}

// // A GET route for scraping the echoJS website
// app.get("/scrape", function (req, res) {
//     // First, we grab the body of the html with axios
//     axios.get("http://www.echojs.com/").then(function (response) {
//         // Then, we load that into cheerio and save it to $ for a shorthand selector
//         var $ = cheerio.load(response.data);

//         // Now, we grab every h2 within an article tag, and do the following:
//         $("article h2").each(function (i, element) {
//             // Save an empty result object
//             var result = {};

//             // Add the text and href of every link, and save them as properties of the result object
//             result.title = $(this)
//                 .children("a")
//                 .text();
//             result.link = $(this)
//                 .children("a")
//                 .attr("href");

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
//         res.send("Scrape Complete");
//     });
// });

// // Route for getting all Articles from the db
// app.get("/articles", function (req, res) {
//     // TODO: Finish the route so it grabs all of the articles
//     db.Article.find({})
//         .then(function (dbArticle) {
//             console.log(dbArticle)
//             res.json(dbArticle)
//         })
//         .catch(function (err) {
//             console.log(err)
//         })
// });

// // Route for grabbing a specific Article by id, populate it with it's note
// app.get("/articles/:id", function (req, res) {
//     // TODO
//     // ====
//     // Finish the route so it finds one article using the req.params.id,
//     // and run the populate method with "note",
//     // then responds with the article with the note included

//     db.Article.findOne({
//         _id: req.params.id
//     })
//         .populate("note")
//         .then(function (dbArticle) {
//             res.json(dbArticle)
//         })
//         .catch(function (err) {
//             console.log(err)
//         })

// });

// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function (req, res) {
//     // TODO
//     // ====
//     // save the new note that gets posted to the Notes collection
//     // then find an article from the req.params.id
//     // and update it's "note" property with the _id of the new 

//     var noteID = "";

//     db.Note.create(req.body)
//         .then(function (dbNote) {
//             console.log(dbNote)
//             noteID = dbNote._id
//             db.Article.updateOne({
//                 _id: req.params.id
//             }, { $set: { note: noteID } }, { new: true })
//                 .then(function (dbArticle) {
//                     res.json(dbArticle)
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })

//         })
//         .catch(function (err) {
//             console.log(err.message);
//         })


// });
