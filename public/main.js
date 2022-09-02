
var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');


const curDate=document.querySelector(".date");
const getCurrentDay=()=>{
    var weekday=new Array(7);
    weekday[0]="SUN";
    weekday[1]="MON";
    weekday[2]="TUE";
    weekday[3]="WED";
    weekday[4]="THU";
    weekday[5]="FRI";
    weekday[6]="SAT";
    let currentTime=new Date();
    let day=weekday[currentTime.getDay()];
    return day;
}
const getCurrentTime=()=>{
    var months=["JAN","FEB","MAR","APR","MAY","JUN","JULY","AUG","SEPT","OCT","NOV","DEC"];
    var now=new Date();
    var month=months[now.getMonth()];
    var date=now.getDate();
    let hours=now.getHours();
    let mins=now.getMinutes();
    let periods="AM";
    if(hours>11){
        periods="PM";
        if(hours>12)
        hours-=12;
    }
    if(mins<10){
        mins="0"+mins;
    }
    return ` ${month} , ${date}   |  ${hours}:${mins} ${periods}`;
}
curDate.innerHTML=getCurrentDay()+"   |   "+getCurrentTime();





weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                console.log()
                if(data.description === "rain" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description
                } else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176) + "C";
                weatherCondition.textContent = data.description.toUpperCase();
            }
        }) 
    });
})