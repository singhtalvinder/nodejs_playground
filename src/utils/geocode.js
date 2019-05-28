// Get the location coordinates: Latitude and longitude for a given location. Ex: paris, uk.
const request = require('request')

// pass address to the fn and execute callback with the result.
const geocode= (address, callback) =>{

    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=<ADD_YOUR-KEY-HERE>&location=' + encodeURIComponent(address)

    request({url, json: true}, (error, response) =>{
        if(error) {
            console.log('Failed to execute the api:'+ error)

            // pass back error to callback
            callback('Unable to connect to location services', undefined )
        } else if(response.error){
            errorString = 'API error:'+ response.error  + "status code" +  response.statusCode;
            console.log(errorString)

            callback(errorString, undefined)
        } else {
            console.log('API response status code'+ response.body.info.statuscode  +
             'res body info status:'+ response.body.info.statuscode +
             ', size: ' + response.body.results[0].locations.length)

            if(response.body.info.statuscode != 400 &&  response.body.results[0].locations.length>=1) {
              const latitude = response.body.results[0].locations[0].latLng.lat
              const longitude  = response.body.results[0].locations[0].latLng.lng
              const providedLocation = response.body.results[0].providedLocation.location
        
              data = latitude + ',' + longitude;
             console.log(`Location: ${providedLocation} has the following coords: Latitude: ${latitude}, longitude: ${longitude}`)
            //   callback(undefined, {
            //       latitude: latitude,
            //       longitude: longitude,
            //       location: providedLocation
            //   })
            // Short hand.
            callback(undefined, {
                latitude,
                longitude,
                location: providedLocation
            })
            } else {
              errorMsg = `Something is wrong . API response status code:' ${response.body.info.statuscode}`
              console.log('something is wrong . API response status code' +  response.body.info.statuscode)
              callback(errorMsg, undefined)
            }
        }
    })
}

module.exports = geocode
// geocoding - conver an address into latitude, longitude values.
// ex: http://www.mapquestapi.com/geocoding/v1/address?key=<YOUR_KEY_HERE>&locations=Burlington,ON
// return the lat and long values.
// const geocodeUrl = 'http://www.mapquestapi.com/geocoding/v1/address?key=<YOUR_KEY_HERE>&location=Burlington,ON'
// request({url: geocodeUrl, json:true}, (error, response) => {
//     if(error) {
//         console.log('Failed to execute the api:'+ error)
//     } else if(response.body.error){
//         console.log('API error:'+ response.body.error  + "status code" +  response.statusCode)
//     }
//     else {
//         console.log('API response status code'+ response.statusCode  + 'res body info status:'+ response.body.info.statuscode + ', size: ' +response.body.results[0].locations.length)
//         //body.info.statuscode
//         //if(response.statusCode === 200 &&  response.body.results[0].locations.length>=1) {
//           if(response.body.info.statuscode != 400 &&  response.body.results[0].locations.length>=1) {
//             const latitude = response.body.results[0].locations[0].latLng.lat
//             const longitude  = response.body.results[0].locations[0].latLng.lng

//             console.log(`Latitude: ${latitude}, longitude: ${longitude}`)
//         } else  {
//             console.log('something is wrong . API response status code' +  response.body.info.statuscode)
//         }

//     }
// })
