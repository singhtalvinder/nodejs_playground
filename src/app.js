const path = require('path')
const express = require('express')
const hbs = require('hbs') // required for partials.

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

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'cloudy',
        location: 'Toronto, on'
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