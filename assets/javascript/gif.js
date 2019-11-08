
var myData = ["lasagne", "pizza", "taco", "sushi", "steak", "bibimbap", "mac and cheese", 
"pasta", "ramen", "cupcake", "pancake", "salad", "roti", "donuts", "grilled lobster", 
"chicken nuggets", "cheesecake", "fish and chips", "chicken curry", "hot dog", "chocolate fountain" ];

$(document).ready(function() {
    renderButton();
    function renderButton() {
        $("#allbuttons").empty();

        for (var i=0 ; i < myData.length; i++) {

            var newButton = $("<button>");
            newButton.addClass("itembutton");
            newButton.addClass("btn btn-success");
            newButton.text(myData[i]);
            newButton.attr("data-name", myData[i]);
            $("#allbuttons").append(newButton);

        }

    }



    $("#addbutton").on("click",  function(event) {
        
        event.preventDefault();
        var addedData = $("#userinput").val().trim();
        if (addedData != "") {
            myData.push(addedData);
            renderButton();
            $("#userinput").val(" ");
        }



    });  

    $(document).on("click", ".itembutton", displayInfo);


    function displayInfo() {
        var itemName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1QvndT5xGhaRH5SwRfADhoBRPpD53IfO&q" + search + "limit=25&offset=0&rating=G&lang=en";
        $("#mainimages").empty();

        $.ajax ({
            url: queryURL,
            method: "GET"
        }) .then(function(response) {
            console.log(response);

            var results = response.data;

            for (var i=0; i<results.length; i++) {

                var dataImage = $("<img>");
                dataImage.attr("src", results[i].images.fixed_height_still.url);
                dataImage.attr("data-still", results[i].images.fixed_height_still.url);
                dataImage.attr("data-animate", results[i].images.fixed_height.url);
                dataImage.addClass("gif");
                dataImage.attr("data-state", "still");
    
    
                var newItemdiv = $('<div class="newItem">');
                var gifRating = results[i].rating;
                var divRating = $("<p>").text("Rating: " + gifRating);
                
                newItemdiv.append(divRating);
                newItemdiv.append(dataImage);
    
                $("#mainimages").prepend(newItemdiv);



            }
    
 
        }); 


    }


    $("#mainimages").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }


        else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });








})