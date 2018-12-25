//Require tools
const tools = require('../../util/tools');
const weather_api = require('../../controllers/weather');
const news_api = require('../../controllers/news');

exports.get_index_route = (req, res) => {
    
    let indexData = [news_api.get_cnn_headlines(), weather_api.getAccuWeather_5Day()]
    
    Promise.all([indexData[0], indexData[1]])
    .then(([cnnRes, weather5Day]) => {
        let date = tools.tools.dateTime();
        let info = {
            welcome: {
                message: 'Welcome to HomeBase',
                date: date,
                ip: req.ip
            },
            news: cnnRes,
            weather: {
                fiveDayForecast: weather5Day
            }
        }
        return info;
    }).then((news) => {
        res.json(news)
    })
    
    //return weather_api.getWeather()
   /* weather_api.getAccuWeather_5Day()
    .then((data) => {
        let date = tools.tools.dateTime();
        let welcome = {
            message: 'Welcome to HomeBase',
            date: date,
            ip: req.ip
        }
        let weather = data;
        let info = {
            date: date,
            welcome: welcome,
            weather: weather
        }
    //res.render('nav/index', {data: info})
    res.json(info)
    }) */
    
   
}

