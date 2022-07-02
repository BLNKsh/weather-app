// to get input 
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector(".form");

// for event listner
form.addEventListener("submit", find);


//default location 
let target = "ghaziabad"

//function to get weather report through weather API
const fetchData = async(target) =>{
try {
    const url = `https://api.weatherapi.com/v1/current.json?key=6c7a6e6ad1384927ac672951220207&q=${target}`
    const response = await fetch(url);
    const data = await response.json();

    const {
        current:{
            temp_c,
            condition:{icon,text},
        },
       location:{name,localtime},
    } = data
    
 // calling to update dom function
 updateDom(temp_c,name,localtime,icon,text,);
    
 } catch (error) {
     alert(`${target} location  is not found OR || your have entered the wrong data. `);
 }

};

// for updating the DOM
function updateDom(temperature, city, time , emoji, cond){
    const exactTime = time.split(" ")[1]
    const exactDate = time.split(" ")[0]
    const exactDay = new Date(exactDate).getDay();
    temperatureField.innerText =temperature;
    cityField.innerText = city;
    dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)} - ${exactDate}`
    emojiField.src= emoji;
    weatherField.innerText = cond;
    
}
fetchData(target);

// function to get the location
function find(e){
    e.preventDefault()
    target = searchField.value;
    fetchData(target);
};

//function  to get the day 
function getDayFullName(numb){
    switch (numb) {
        case 0:
            return "sunday"
        case 1:
             return "monday"
        case 2:
            return "tuesday" 
        case 3:
            return "wednesday"
        case 4:
            return "thursday"     
        case 5:
            return "friday"
        case 6:
            return "saturday"           
        default:
            return "dont know"
    }
}
