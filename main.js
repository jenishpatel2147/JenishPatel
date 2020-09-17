const express = require('express');
const https = require('https');

var app = express();

// Will need this to include jQuery in Node.js
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

app.get('/', function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=203ef18947ce5c667130ee82a9708b18";
   
    https.get(url, function(response) {
        //console.log(response.statusCode);
        response.on("data", function(stuff) {
            const weatherData = JSON.parse(stuff);
            // console.log(weatherData);
            const description = weatherData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon  + "@2x.png";
            //console.log($("#city").text()); // code 
            //$("#icon").attr("src", icon);
           // res.sendFile(__dirname+ "\\main.html");
           res.write(description);
           res.write(icon);
           // res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("Server running successfully");
});
