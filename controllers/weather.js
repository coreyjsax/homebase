const request = require('request-promise-cache');

//d15e200bd09b2ef1eb46ceb003781874
//http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
//api.openweathermap.org/data/2.5/forecast?zip=94040,us

// accu weather key ZAtQDwqJ4396GTCM2dUAjJDBqYdEtA0t
// accu city code 348794 for minneapolis

//curl -X GET "http://dataservice.accuweather.com/forecasts/v1/daily/1day/locationKey?apikey=ZAtQDwqJ4396GTCM2dUAjJDBqYdEtA0t"
//National Weather Service API https://api.weather.gov/gridpoints/MPX/107,71/forecast
//NY Times API Key > 1f796d5a057c4b5c8cde659afa428f82
//Top Stories >  1f796d5a057c4b5c8cde659afa428f82

const locationKey = '348794';
const five_day_weather = `http://api.openweathermap.org/data/2.5/forecast?zip=55407,us&APPID=d15e200bd09b2ef1eb46ceb003781874`
const accu_w_1_day = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${process.env.accu_city}?apikey=${process.env.accu_weather_key}`;
// fetch("http://dataservice.accuweather.com/forecasts/v1/daily/1day/locationKey?apikey=ZAtQDwqJ4396GTCM2dUAjJDBqYdEtA0t")
const accu_w_5_day = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + process.env.accu_city + '?apikey=' + process.env.accu_weather_key;

const alerts = 'http://dataservice.accuweather.com/alerts/v1/' + process.env.accu_city + '?apikey=' + process.env.accu_weather_key;

exports.getWeather = () => {
     return request(five_day_weather)
     .then((res)=> {
       let data = JSON.parse(res);
       return data;
    }).catch((error) => {
        return error;
    })
}
    
exports.getAccuWeather_1Day = () => {
    return request(accu_w_1_day)
    .then((res) => {
        let data = JSON.parse(res);
        return data;
    }).catch((error) => {
        return error;
    })
}
   
exports.getAccuWeather_5Day = () => {
    return request({
        url: accu_w_5_day,
        cacheKey: accu_w_5_day,
        cacheTTL: 100000,
        cacheLimit: 10000
    })
    .then((res) => {
        let data = JSON.parse(res);
        return data;
    }).catch((error) => {
        return error;
    })
}

exports.getNationalWeatherSvc = () => {
    return request('https://api.weather.gov/gridpoints/MPX/107,71/forecast')
    .then((res) => {
        let data = JSON.parse(res);
        return data;
    }).catch((error) => {
        return error;
    })
}

exports