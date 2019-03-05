let request = new XMLHttpRequest();
let url = "https://api.sunrise-sunset.org/json?lat=40.705310&lng=-74.014144";

request.open("GET", url, true);

//Callback function executes when request is successfully completed
request.onload = function() {
    // Begin accessing JSON data here. Data stored in request.response
    let data = JSON.parse(this.response);

    let sunrise = document.getElementById('sunrise');
    let sunset = document.getElementById('sunset');

    if (request.status >= 200 && request.status < 400) {
        sunrise.textContent = convertToEST(data.results.sunrise);
        sunset.textContent = convertToEST(data.results.sunset);
    }
    else {
        console.log("Error");
    }
};

request.send();

function convertToEST(utc) {
    //est = utc - 5hrs
    let utcHours = utc.substr(0, utc.indexOf(":"));
    let utcMinSec = utc.substr(utc.indexOf(":")+1);
    console.log(utcHours);
    let est = parseInt(utc, 10) - 5;
    est += ":" + utcMinSec;
    return est;
}