$(document).ready(function(){

 
  $(".btn").on("click", function(event) {
    event.preventDefault();
    // Create a string which will hold the searched cities
    var searchedItems = "";

    if ($(".form-control").val() === "") {
      alert("Empty values are not allowed. Please enter a City name, then click on Search")
    }else {
      searchedItems = $(".form-control").val();
  
  
      // ...dump the searched cities into searchHistory div.
      $(".searchHistory").prepend("<br><hr>" + searchedItems);
  
      console.log(searchedItems);
  
        // This is our API key
        var APIKey = "166a433c57516f51dfab1f7edaed8413";
        var unitsType1 = "metric";
        // var unitsType2 = "imperial";
  
        // Building Query Variable based on api query structure, linking the "q" element to user`s input in the search bar
        
        var queryURLmetric = 
        "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + searchedItems +
        "&units=" + unitsType1 + 
        "&appid=" + APIKey;
  
        

        // Run AJAX call to the OpenWeatherMap API
        $.ajax({
          // url: queryURL,
          url: queryURLmetric,         
          method: "GET"
        })
          // We store all of the retrieved data inside of an object called "response"
          .then(function(response) {
  
            // Log the queryURL
            // console.log(queryURL);
            console.log(queryURLmetric);
  
            // Log the resulting object
            console.log(response);
  
            // Transfer content to HTML
            $(".city").html("<h2>" + response.name + " Weather Details</h2>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            
            // Convert the temp to fahrenheit
            var tempF = (response.main.temp * 9/5) + 32;
            var tempFeelF = (response.main.feels_like * 9/5) + 32;
            var tempMaxF = (response.main.temp_max * 9/5) + 32;
            var tempMinF = (response.main.temp_min * 9/5) + 32;
  
            // add temp content to html in Celcius
            $(".temp").text("Temperature (C): " + response.main.temp);
            $(".tempFeel").text("Temperature (C) feels like: " + response.main.feels_like);
            $(".tempMax").text("Temperature (C) Max: " + response.main.temp_max);
            $(".tempMin").text("Temperature (C) Min: " + response.main.temp_min);
  
            // add temp content to html in Farenheit
            $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
            $(".tempFeelF").text("Temperature (F) feels like: " + tempFeelF.toFixed(2));
            $(".tempMaxF").text("Temperature (F) Max: " + tempMaxF.toFixed(2));
            $(".tempMinF").text("Temperature (F) Min: " + tempMinF.toFixed(2));
            
  
          });

        
        
        // Building Query Variable to show 5 days forecast
        var queryURLforecast = 
        "https://api.openweathermap.org/data/2.5/forecast?" + 
        "q=" + searchedItems + 
        "&units=" + unitsType1 + 
        "&appid=" + APIKey;

        

        // Run AJAX call to the OpenWeatherMap API
        $.ajax({
          // url: queryURL,
          url: queryURLforecast,         
          method: "GET"
        })
          // We store all of the retrieved data inside of an object called "response"
          .then(function(response) {
            console.log(queryURLforecast);
            console.log(response.list[0].weather[0].icon)
            var iconDay1 = response.list[0].weather[0].icon;
            var pngDay1 = "http://openweathermap.org/img/w/" + iconDay1 + ".png";
            var iconDay2 = response.list[1].weather[0].icon;
            var pngDay2 = "http://openweathermap.org/img/w/" + iconDay2 + ".png";
            var iconDay3 = response.list[2].weather[0].icon;
            var pngDay3 = "http://openweathermap.org/img/w/" + iconDay3 + ".png";
            
            
            $("#day1").text("temp = " + response.list[0].main.temp);
            $("#imgDay1").attr("src", pngDay1);
            console.log(iconDay1);
            $("#day2").text("temp = " + response.list[1].main.temp);
            $("#imgDay2").attr("src", pngDay2);
            console.log(iconDay2);
            $("#day3").text("temp = " + response.list[2].main.temp);
            $("#imgDay3").attr("src", pngDay3);
            console.log(iconDay3);

            $(".col-sm-12").show();
            
           
            
          });

    }



    });

  
  
});