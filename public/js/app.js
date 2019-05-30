console.log('Client side javascript is loaded');

// fetch is a browser based api and not accessible in nodejs.
// so we need to use this client side api to fetch weather info from backend.

// setup a call to fetch the weather for a location.
// get parse json response.

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_One = document.querySelector('#messageOne')
const message_Two = document.querySelector('#messageTwo')


// Get weather info when the form is submitted.
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //avoid the page refresh on form submit.

    const location = search.value;
    console.log('Testing the form submit for location: ' + location)

    message_One.textContent = "Fetching the information..."
    message_Two.textContent = ''

    // fetch the information for the given location.
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)  
            message_One.textContent = data.error //"Please check your input location."
            message_Two.textContent = ''
        } else {
            // console.log(data.location)
            // console.log(data.forecast)
            message_One.textContent = data.location
            message_Two.textContent = data.forecast
        }
    })
 })
})