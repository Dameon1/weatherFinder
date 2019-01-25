"use strict";
$(document).ready(function() {
  const appID = "d1ba3e9127977098a5e40fc6948b4dc7";

  let temperature = 0;
  $(".query_btn").click(function() {
    var query_param = $(this)
      .prev()
      .val();
    let weather;
    if (
      $(this)
        .prev()
        .attr("placeholder") === "City"
    ) {
      weather =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        query_param +
        "&APPID=" +
        appID;
    } else if (
      $(this)
        .prev()
        .attr("placeholder") === "Zip Code"
    ) {
      weather =
        "http://api.openweathermap.org/data/2.5/weather?zip=" +
        query_param +
        "&APPID=" +
        appID;
    }
    $.getJSON(weather, function(json) {
      temperature = json.main.temp;
      $("#city").html(json.name);
      $("#main_weather").html(json.weather[0].main);
      $("#description_weather").html(json.weather[0].description);
      $("#weather_image").attr(
        "src",
        "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png"
      );
      $("#temperature").html(json.main.temp);
      $("#pressure").html(json.main.pressure);
      $("#humidity").html(json.main.humidity);
    });
  });

  // Optional Code for temperature conversion

  $("#convertToKelvin").click(function() {
    $("#temperature").text(temperature);
    $("#format").text("Kelvin");
  });

  $("#convertToCelsius").click(function() {
    $("#temperature").text(Math.floor(temperature - 273.15));
    $("#format").text("Celcius");
  });

  $("#convertToFahrenheit").click(function() {
    $("#temperature").text(Math.floor((9 / 5) * (temperature - 273.15) + 32));
    $("#format").text("Fahrenheit");
  });
});
