    // Gimme GIPHY JS Code


    //Create an array of strings to hold reactions
    var reactionArray = [];
    var reactionStillsArrayURL = [];
    var reactionsGifArrayURL = [];
    // Creating a reaction image var to be used in displays
    var reactionImage;


    // Event handler for user clicking the submit reaction button
    $("#submit-reaction").on("click", function(event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();
        // Storing the reaction name
        var inputReaction = $("#reaction-input").val().trim();

        reactionArray.push(inputReaction);
        console.log(reactionArray);

        //Creating a new button for the reaction
        var newButton = $("<button>");
        newButton.addClass("display-button");
        // Adding a data-attribute with a value of the reaction
        newButton.attr("data-reaction", inputReaction);
        // Providing the button's text with a value of the reaction
        newButton.text(inputReaction);
        // Adding the button to the HTML

        $(".button-panel-body").append(newButton);

        //console.log(newButton)

    }); //on click submit button function()


    // Adding click event listen listener to all buttons
    $(document).ready(function() {
        $(document).on("click", ".display-button", function() {

            // Preventing the button from trying to submit the form
            event.preventDefault();

            // Grabbing and storing the data-reaction property value from the button
            var reaction = $(this).attr("data-reaction");

            // Constructing a queryURL using the animal name
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                reaction + "&api_key=dc6zaTOxFJmzC&limit=10";

            // Performing an AJAX request with the queryURL
            $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                // After data comes back from the request
                .done(function(response) {
                    console.log(queryURL);

                    console.log(response);
                    // storing the data from the AJAX request in the results variable
                    var results = response.data;
                    var gifscountlimiter = (results.length > 10) ? 10 : results.length;

                    // Looping through each result item up to 10 gif's per the assignment
                    for (var i = 0; i < gifscountlimiter; i++) {

                        // Creating and storing a div tag
                        var reactionDiv = $("<div class='gif-div'>");

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text(reaction + " Gif #" + (gifscountlimiter - i) + ";  Rating: " + results[i].rating.toUpperCase());

                        // Creating and storing an image tag
                        // var reactionImage = $("<img 'class=gif-image'>");
                        // // Setting the src attribute of the image to a property pulled off the result item
                        // reactionImage.attr("src", results[i].images.fixed_height.url);

                        // Creating and storing an image tag
                        var reactionImage = $("<img class='gif-image'>");

                        // Setting the src attribute of the image to a property pulled off the result item
                        reactionImage.attr("src", results[i].images.fixed_height_still.url);
                        reactionImage.attr("data-still", results[i].images.fixed_height_still.url);
                        reactionImage.attr("data-animate", results[i].images.fixed_height.url);
                        reactionImage.attr("data-state", "still");


                        // Appending the paragraph and image tag to the animalDiv
                        reactionDiv.append(reactionImage);
                        reactionDiv.append(p);

                        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                        $("#gifs-appear-here").prepend(reactionDiv);
                    } //for
                }); //.done function()
        }); //on click function()
    }); //document ready

    //$(document).ready(function(){
    $(document).on("click", ".gif-image", function() {

        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }); //on click function()
    //});  //document.ready function()
