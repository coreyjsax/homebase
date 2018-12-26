//Require tools
const tools = require('../../util/tools');
const weather_api = require('../../controllers/weather');
const news_api = require('../../controllers/news');

exports.get_index_route = (req, res) => {
    let lat;
    let lng;
    if (!req.params.lat && !req.params.lng) {
        lat = '';
        lng = '';
    } else if (!req.params.lat || !req.params.lng){
        lat = '';
        lng = '';
    } else {
        lat = req.params.lat;
        lng = req.params.lng;
    }
    let w = weather_api;
    let n = news_api;
    let indexData = [n.get_cnn_headlines(), w.getAccuWeather_5Day(lat, lng), 
        w.getCurrentConditions(lat, lng), w.sunRiseSunSet(lat, lng)]
    
    Promise.all([indexData[0], indexData[1], indexData[2], indexData[3]])
    .then(([cnnRes, weather5Day, weatherCurrent, riseFall]) => {
        let date = tools.tools.dateTime();
        let info = {
            welcome: {
                message: 'Welcome to HomeBase',
                date: date,
                ip: req.ip
            },
            news: cnnRes,
            weather: {
                currentConditions: weatherCurrent,
                fiveDayForecast: weather5Day,
                sunRise_sunSet: riseFall
            }
        }
        return info;
    }).then((news) => {
        res.json(news)
    })
}

