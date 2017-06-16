//*************** to do *****************************************************************
//save previous searches
//correct search string
//add check to local storage; if duplicate exists, dont add 
//***************************************************************************************

//*********************** Global code ***************************************************
//api();
//offline();
var searchCount = 0;
// keep memory of search history down to 10 buttons on load
if (localStorage.length >= 10)
    localStorage.length = 10;

initButts();

//**************************************************************************************
//FUNCTIONS
//**************************************************************************************
// send api request when button is clicked
$(document.body).on("click", ".but", function() {
    api($(this).val());
});

// use local storage to print previously searched terms on screen with buttons
function initButts() {
    for (i = 0; i < localStorage.length; i++) {
        var newButt = $("<input>");
        newButt.attr("value", localStorage.getItem(i));
        newButt.attr("class", "but");
        newButt.attr("type", "button");
        $("#butts").append(newButt);
    }
}
// add new button to screen upon searching
function addButts() {
    var newButt = $("<input>");
    newButt.attr("value", $("#query").val());
    newButt.attr("class", "but");
    newButt.attr("type", "button");
    $("#butts").append(newButt);
}

// initialize api query upon enter key-up 
$('#query').on('keypress', function(e) {
    if (e.which === 13) {
        $(this).attr("disabled", "disabled");
        api($("#query").val());
        addButts();
        $(this).removeAttr("disabled");
    }
});
// switch between still and gif state upon clicking a gif
$(document.body).on("click", ".gif", function() {
    if ($(this).attr("data-state") == "still") {
        $(this).attr("data-state", "gif");
        $(this).attr("src", $(this).attr("data-gif"));
    } else if ($(this).attr("data-state") == "gif") {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }

});
// call the api with the query sent as argument and add said query to local storage
function api(q) {
    var key = "dc6zaTOxFJmzC";
    var query = q;
    if (searchCount >= 10)
        searchCount = 0;
    else
        searchCount++;

    localStorage.setItem(searchCount, query);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + key;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        //moving console.log(response.data["0"].images.original.url);
        //still console.log(response.data["0"].images.original_still.url);
        $("#display").empty();
        for (i = 0; i < 5; i++) {
            var newGif = $("<img>");
            newGif.attr("data-gif", response.data[i].images.original.url);
            newGif.attr("data-still", response.data[i].images.original_still.url);
            newGif.attr("data-state", "still");
            newGif.attr("src", response.data[i].images.original_still.url);
            newGif.attr("class", "gif");
            $("#display").append(newGif);
        }

    });
} // end api

// for testing purposes without internet connection
function offline() {
    for (i = 0; i < 2; i++) {
        var newGif = $("<img>");
        newGif.attr("data-gif", "assets/images/bg2.jpg");
        newGif.attr("data-still", "assets/images/bg.jpg");
        newGif.attr("data-state", "still");
        newGif.attr("src", "assets/images/bg.jpg");
        newGif.attr("class", "gif");
        $("#display").append(newGif);
    }
}
