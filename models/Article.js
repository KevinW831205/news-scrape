var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ArticleSchema object
var ArticleSchema = new Schema({

    // 'url' is required and of type string has unique property to prevent duplicates.
    url: {
        type: String,
        required: true,
        unique: true
    },
    // `title` is required and of type String
    headline: {
        type: String,
        required: true
    },
    // `link` is required and of type String
    summary: {
        type: String,
        required: true
    }


    // associating models

    // note: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Note"
    // }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
