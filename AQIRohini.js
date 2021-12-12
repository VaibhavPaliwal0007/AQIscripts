const request = require('request');
const AQI = require('./pollutantsModel')
const loopFunc = require('./populatingDocument')
const ifElse = require('./calculateAQI')
require('./db')

let options = {
    url: 'https://app.cpcbccr.com/aqi_dashboard/aqi_all_Parameters',
    "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "accesstoken": "eyJ0aW1lIjoxNjM5MTM1MTY2OTEwLCJ0aW1lWm9uZU9mZnNldCI6LTMzMH0=",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "Referer": "https://app.cpcbccr.com/AQI_India/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": "eyJzdGF0aW9uX2lkIjoic2l0ZV8xNDMwIiwiZGF0ZSI6IjIwMjEtMTItMTBUMTY6MDA6MDBaIn0=",
      "method": "POST"
}

let rohiniData = {
    state: "Delhi",
    city: "Rohini",
};

request(options, async function(error, response, body) {
    if(error) {
        console.log(error);
    }

    let res = JSON.parse(body);
    let data = res.metrics;

    loopFunc(data, rohiniData);

    ifElse(rohiniData);
    
    try{
        const aqi = new AQI(rohiniData);
 
        await aqi.save();
    }
    catch(e){
        console.log(e);
    }

    console.log(rohiniData);
});



