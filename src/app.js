const path = require('path')
const express = require('express')
const hbs = require('hbs') // required for partials.
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// NOTE:  nodemon doesn't detect changes to the hbs files so we need to tell
// nodemon to take care of that as well as below:
// cmd>nodemon .\src\app.js -e js,hbs


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirPath = path.join(__dirname, '../public')

// hbs by default, requires the files to be served, be in views folder at root level.(can be configured. )
// here we are specifying templates instead of views to be the folder for serving the files.
const viewsPath = path.join(__dirname,'../templates/views');

// customize the path for the partials directory.
const partialPath = path.join(__dirname, '../templates/partials')

// Use hbs which internally used handelbars as view engine.
app.set('view engine', 'hbs')

// let express use the viewPath as the path to serve files.
app.set('views', viewsPath)

// register the partials using hbs.
hbs.registerPartials(partialPath)

// static directory to serve.
app.use(express.static(publicDirPath))

// Now to use this, we specify it as below. Parameters can be passed as second parameter.
app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'TSingh'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'TSingh'
    })

})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: "Help Documentation.",
        title: 'Find all the help here .',
        name: 'TSingh'
    })

})

// home page. Default landing page.
// NOT needed when we use express to serve a static page.
// app.get('', (req, res) => {
//     res.send('<h1>The Weather Network</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send('This is help page.')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>This is about page.</h1>')
// })

// Get the weather for a specific address.
// usage: /weather?address=toronto, on

app.get('/weather', (req, res) => {

    console.log(req.query)

    // Address must be supplied.
    if(!req.query.address) {
        return res.send({
            error: 'Please specify an address to get the weather information.'
        })
    }

    // Process the request to get the latitude and longitude for an address.
    geocode(req.query.address, (error, data) => {
        if(error) {
            return res.send({error})
        }

        const latitude = data.latitude
        const longitude = data.longitude
        
        // Get the forecast for the location data.
        forecast(latitude,longitude, (error, forecastData) =>{
            if(error) {
                return res.send({error})
            }

            // All well. send the forecast for the location.
            res.send({
                forecast : forecastData,
                location : data.location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    // Use req.query to get the search criteria on this '/products' category to get 
    // only those specifc results.
    // The query on the browser may look like :
    // http://localhost:3000/products?search=tyres&type=winter
    // The query object received here would look like:
    //{ search: 'tyres', type: 'winter' }
    // To make the 'search' be compulsary to access this link, 
    // we need to specify it as follows:
    if(!req.query.search) {
        return res.send({
            error: 'Please specify a search criteria for the products.'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'TSingh',
        errorMessage: 'Help article not found !!'
    })

})
// not found url goes here.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'TSingh',
        errorMessage: 'Page not found !!'
    })
})

app.listen(3000, () =>{
    console.log('Server stated at port:3000')

})
