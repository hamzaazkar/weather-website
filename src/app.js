const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine , views and partials location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath ))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Hamza Azkar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Hamza Azkar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        text:'hey you can contact if you want',
        title: 'Help',
        name:'Hamza Azkar'
    })
})

app.get('/weather',(req,res)=>{

        if (!req.query.address) {
            return res.send({
                error:'you must provide the address for weather'
            })
        }

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
    
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })

        
     
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormsg:'Help page not found',
        title: '404!',
        name:'Hamza Azkar'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errormsg:'Page not found',
        title: '404!',
        name:'Hamza Azkar'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})