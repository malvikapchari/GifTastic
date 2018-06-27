
$(document).ready(function() {

    var FruitGifs = {
        topics: ["apple", "strawberry", "blueberry"],
        makeButtons: function() {
            for (var i = 0; i < FruitGifs.topics.length; i++) {
                var newBttn = $('<button>');
                newBttn.attr("data-search", FruitGifs.topics[i]);
                newBttn.addClass("btn");
                newBttn.addClass("searchButtons");
                newBttn.text(FruitGifs.topics[i]);
                $('#searchButtonsContainer').append(newBttn);
            }
        },
        addFruits: function(cool) {
          cool.preventDefault();
          var addedFruits = $('#submitBox').val();

          if (FruitGifs.topics.indexOf(addedFruits) < 0 && addedFruits.length > 0) {
              FruitGifs.topics.push(addedFruits);
              var newBttn = $('<button>');
              newBttn.attr("data-search", addedFruits);
              newBttn.addClass("btn");
              newBttn.addClass("searchButtons");
              newBttn.text(addedFruits);
              $('#searchButtonsContainer').append(newBttn);
          }

        },
        displayResults: function(cool) {
            $('#showGIFS').empty();
            cool.preventDefault();

            var userQuery = $(this).data('search');
            var key = "&api_key=dc6zaTOxFJmzC";
            var limit = "&limit=7"
            var theUrl = "https://api.giphy.com/v1/gifs/search?q=" + userQuery + limit + key;
            // console.log(theUrl);
            $.ajax({
                url: theUrl,
                method: "GET"
            }).done(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    var fruitContainer = $('<div>');
                    fruitContainer.addClass('fruitContainerer');
                    var liveLink = response.data[i].images["fixed_height"].url;
                    var stillLink = response.data[i].images["fixed_height_still"].url;
                    var rating = response.data[i].rating;
                    console.log(rating);
                    var rateWidth = $('<p>');
                    rateWidth.addClass('gifRating');
                    rateWidth.text("Rating: " + rating);
                    var newImg = $('<img>');
                    newImg.attr('src', stillLink);
                    newImg.attr('data-animate', liveLink);
                    newImg.attr('data-still', stillLink);
                    newImg.attr('data-state', "still")
                    newImg.addClass('gif');
                    fruitContainer.prepend(rateWidth);
                    fruitContainer.append(newImg);

                    $('#showGIFS').append(fruitContainer);
                }

                $('.gif').on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr('src', $(this).data("animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr('src', $(this).data("still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });
        },

    }
    FruitGifs.makeButtons();



    $('#submitTerm').click(FruitGifs.addFruits);
    $(document).on('click', '.searchButtons', FruitGifs.displayResults);
});
