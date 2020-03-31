$(document).ready(function () {
            //Array for searched topics to be added
            var topics = ["dog", "cat", "rabbit","hamster","goldfish","bird","frog","chicken","pygmy goat"];
$(document).on("click", ".topic", function(button){
                    var search;
                    button.preventDefault();
                    search = $(this).attr("data-search")

                    console.log("search tearm: " +search);

                    //Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
                    //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
                    function display_topics() {

                        // var x = $(this).data("search");
                        // console.log(x);

                        // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4J5mUtMTin61t5UZ493t9arlmiHdq25T&q=" + search + "&limit=25&offset=0&rating=G&lang=en";
                        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=4J5mUtMTin61t5UZ493t9arlmiHdq25T&limit=10";
                        console.log(queryURL);

                        $.ajax({
                            url: queryURL,
                            method: "GET"
                        }).then(function (response) {
                            var results = response.data;
                            console.log(results);
                            for (var i = 0; i < results.length; i++) {

                                var topicsDiv = $("<div class='col-md-4'>");

                                var rating = results[i].rating;
                                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                                var staticSrc = results[i].images.fixed_height_still.url;
                                var topicsImage = $("<img>");
                                var p = $("<p>").text("Rating: " + rating);

                                topicsImage.attr("src", staticSrc);
                                topicsImage.addClass("_Giphy");
                                topicsImage.attr("data-state", "still");
                                topicsImage.attr("data-still", staticSrc);
                                topicsImage.attr("data-animate", defaultAnimatedSrc);
                                topicsDiv.append(p);
                                topicsDiv.append(topicsImage);
                                $("#gifArea").prepend(topicsDiv);

                            }
                        });


                    }
                    display_topics();

                    //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
                    

            })

            $("#addbutton").on("click", function (event) {
                event.preventDefault();
                var newtopics = $("#item-input").val().trim();
                topics.push(newtopics);
                console.log(topics);
                $("#topicInput").val('');
                displayButtons();
            });

            //Function iterates through topics array to display button with array values in "myButtons" section of HTML
            function displayButtons() {
                $("#myButtons").empty();
                for (var i = 0; i < topics.length; i++) {
                    var a = $('<button class="btn btn-primary">');
                    a.attr("class", "btn");
                    a.attr("class", "btn-primary topic");
                    a.attr("data-search", topics[i]);
                    a.text(topics[i]);
                    $("#myButtons").append(a);
                }
            }


            displayButtons();

            //Click event on button with id of "topics" executes display_topics function
            //$(document).on("click", "#topics", display_topics);

            //Click event on gifs with class of "_Giphy" executes pausePlayGifs function
            $(document).on("click", "._Giphy", pausePlayGifs);

            //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
            function pausePlayGifs() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            }

})