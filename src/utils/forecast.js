const request = require('request')

const forecast = (latitude,longitude, callback)=>{
    const url= "https://api.darksky.net/forecast/fa72f9382f0ed44a53ace8bfd1c20f23/"+ latitude+","+ longitude+"?units=si";

    request({url:url, json:true}, (error,response)=>{
    
        if (error) {
            callback('Unable to connect to the weather service',undefined)
        }else if(response.body.error){
            callback('unable to find location',undefined)
        }
         else {
            callback(undefined,response.body.daily.data[0].summary + "It is currently " + response.body.currently.temperature + " degrees out. There is "+ response.body.currently.precipProbability +"% chance of rain")
        }
    });

}

module.exports = forecast

