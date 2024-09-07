const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

 
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get("/", function(req,res){
   
 res.render('index.ejs');
});

// var weather = JSON.parse(data);
var temp = "";
var description =  "";
var icon = "";
var imgUrl = "";
var query = "";
var speed ="";
var humidity = "";
var pressure = "";

app.get("/weather", function(req,res){
    res.render("weather", {temperature: temp, des: description, image:imgUrl, country:query, pressureData:pressure, humidityData:humidity, speedData:speed});
    // res.render('weather.ejs');
   });

app.post("/weather", function(req,res){
    const key = "7ba2905bcb252530a7f600fe4152bd87";
     query = req.body.location;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=metric";
    
    https.get(url, function(response){
    
                 console.log(response.statusCode);
    
                     response.on("data", function(data){
                        // console.log(data);
                       weather = JSON.parse(data);
                         temp = weather.main.temp;
                         description = weather.weather[0].main;
                         icon = weather.weather[0].icon;
                         pressure = weather.main.pressure;
                         speed = weather.wind.speed;
                         humidity = weather.main.humidity;

                         imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                         res.redirect("/weather");
                        // res.write("<p> The weather is " + description + " </p>");
                        // res.write("<h1> The temperature in " + query + " is " + temp +" Degree Celsius </h1>");
                        // res.write("<img src=" + imgUrl +">");
                        // res.send();
                         
                    })
            });
    
    });
    
app.listen(process.env.PORT || 3000, ()=>{

    console.log("Server started on port 3000");
});

    
    