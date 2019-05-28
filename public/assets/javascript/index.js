// js for the index page not to be confused with the index models


$('#addCommentModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget) // Button that triggered the modal
    const articleid = button.data("id") // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

    $(this).find("#submitComment").attr("data-articleid", articleid);
})

$("#submitComment").on("click", function (event) {
    const articleid = $(this).data("articleid");
    $("#comment-validation").hide()

    console.log("submitbutton clicked")

    if (!$("#comment-input").val()) {
        $("#comment-validation").show()
        return console.log("error")
    }

    $.ajax({
        method: "POST",
        url: "/api/articles/" + articleid,
        data: {
            // Value taken from note textarea
            comment: $("#comment-input").val()
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#comment-input").val("");
    location.reload();
    //show submitted
});

$(document).on("click", ".comment-delete", function (event) {
    $.ajax({
        method: "DELETE",
        url: "/api/comment/" + $(this).data("id"),
        data: {
        }
    })
        // With that done
        .then(function (data) {
            location.reload();
        });

})

