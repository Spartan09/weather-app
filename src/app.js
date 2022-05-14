const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ayushman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ayushman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: `It is simple really, just go to the Weather page and search ༼ つ ◕_◕ ༽つ`,
        name: 'Ayushman'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }
    forecast(address, (error, forecastData) => {
        if (error) {
            return res.send({ error });
        }
        const { name, region, country } = forecastData.location
        const { weather_descriptions, temperature, precip, weather_icons } = forecastData.current
        res.send({
            location: `${name}, ${region}, ${country}`,
            forecast: `${weather_descriptions}. It is currently ${temperature} degrees out. There is a ${precip}% chance of rain.`,
            icon: weather_icons
        });
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help page not found.',
        name: 'Ayushman'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Ayushman'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})