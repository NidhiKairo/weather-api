const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

const https = require('https');


app.get('/', function(req, res){

    res.sendFile(__dirname+"/index.html");

})
app.post('/', function(req,res){
    const query = req.body.cityName
    const apiKey = "f9144ee84bf183923810a4c5ce98ee61";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+apiKey;
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<p>The weather is currently" + " "+ weatherDescription+"!</p>");
            res.write("<h1>The temprature in "+query+" is"+ " " + temp +" "+ "degree celcius.</h1>");
            res.write("<img src="+imageURL+">");
            
            res.send()
        })
    })
})



app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})