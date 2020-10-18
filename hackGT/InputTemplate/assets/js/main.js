$(document).ready(function() {
    $('#form').submit(function(event) {
        event.preventDefault();
    });

    $(".submit-now").click(function() {
        $(".views").addClass("moveleft");
    })

    $('#form').submit(function(event) {
        event.preventDefault();

        var hashTagsArray = $('#hashtag').val().split(' ');
        var title = $('#title').val();
        var link = $('#link').val();
        var category = $('#category-selector').val();

        for (var tag of hashTagsArray) {
            pushData(tag.toLowerCase(), title, link, category);
        }

    });
})
