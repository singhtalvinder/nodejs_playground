// Get the weather information based on a location.
// Location is first converted into the latitude and longitude values to be used in this api.

const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = `https://api.darksky.net/forecast/5f5d3ac05715854ff7257a5ed20b78ae/${latitude},${longitude}`

    // send the request.
    //request({url: url, json: true}, (error, response) => {
    // Shorthand syntax.
    request({url, json: true}, (error, {body}) => {
        if(error) {
          console.log('Error :' + error)
          callback(error, undefined)

        //} else if(response.body.error) {
        } else if(body.error) {
            const errorMsg = `Unable to find the location : ${body.error}`
            console.log(errorMsg)
                 
            callback(errorMsg, undefined)
        }  else {
            locationStr = `It is currently ${body.currently.temperature} F-degrees out.
             The today's high is: ${body.daily.data[0].temperatureHigh}F, 
             with a low of: ${body.daily.data[0].temperatureLow}F. ${body.daily.data[0].summary},
             with a ${body.currently.precipProbability}% chance of rain.`
            //console.log(locationStr);
            
            callback(undefined, locationStr)
          // next code needed only if we don't pass json: true as second arg with url as above.
          // const data = JSON.parse(response.body)
          // console.log(data.currently)  
        }
    })
}

module.exports = forecast

// for C instead of F.
//const url = 'https://api.darksky.net/forecast/f7257a5/37.8267,-122.4233?units=si'

// show in C and language is punjabi.
//const url = 'https://api.darksky.net/forecast/v/43.328674,-79.817734?units=si&lang=pa'

//const url = 'https://api.darksky.net/forecast/f7257a5/43.328674,-79.817734'

// const url = 'https://api.darksky.net/forecast/f7257a5/43.328674,-79.817734'
// request({url: url, json: true}, (error, response) => {
//     if(error) {
//         console.log('Error is ' + error)
//     } else if(response.body.error) {
//         console.log('failed to get good response : ' + response.body.error)
//     }  else {
//         console.log(response.body.timezone)
//          console.log(`It is currently ${response.body.currently.temperature}. ${response.body.daily.data[0].summary}, There is ${response.body.currently.precipProbability}% chance of rain`);
//     // next code needed only if we don't pass json: true as second arg with url as above.
//     // const data = JSON.parse(response.body)
//     // console.log(data.currently)  
//     }

// })