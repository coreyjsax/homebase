const request = require('request-promise-cache');
const headlines = `https://api.nytimes.com/svc/topstories/v2/home.json`;
const cnn_headines = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.cnn_key}`

exports.get_nyt_headlines = () => {
    return request({
       url: headlines,
       headers: {
           'api-key': process.env.nytimes_key
       }
    }).then((data) => {
        let headlines = JSON.parse(data);
        return headlines;
    }).catch((error) => {
        return error
    })
}

exports.get_cnn_headlines = () => {
    return request(cnn_headines)
    .then((res) => {
        let headlines = JSON.parse(res);
        return headlines;
    }).catch((error) => {
        return error;
    })
}

