// js for the index page not to be confused with the index models


$('#addCommentModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var articleid = button.data("id") // Extract info from data-* attributes
    console.log(articleid)
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

    $(this).find("#submitComment").attr("targetArticle",articleid);
})