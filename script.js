'use strict';
// All section container elements
const homeContainer = document.querySelector('.home_container');
const listContainer = document.querySelector('.list_container');
const searchContainer = document.querySelector('.search_container');

const searchTop = document.querySelector('.search_top')
const searchBottom = document.querySelector('.search_bottom')

// button element on all header
const back = document.querySelectorAll('.back_btn');

//List section element
const listSection = document.querySelector('.breweries_list');

//Search section element
const searchSection = document.querySelector('.breweries_search');

const apiURL = `https://api.openbrewerydb.org/breweries`;
const stateURl = `https://gist.githubusercontent.com/ahmu83/38865147cf3727d221941a2ef8c22a77/raw/c647f74643c0b3f8407c28ddbb599e9f594365ca/US_States_and_Cities.json`




// Creating a home section
function createHomepage() {

    homeContainer.insertAdjacentHTML('beforeend', `
   
    <div class="header">
       <h1>Brewery DB</h1>
    </div>
    
   <div class="btn_container">
      <button class="list_btn" onclick="getData()">List Breweries</button>
      <button class="search_btn" onclick="toPage('search_container')">Search Breweries</button>
    </div>
    <div class="switch hidden">
    </div>
    `)
}

createHomepage()

// Getting data for the List

let count = 1;

function getData() {

    document.querySelector('.switch').classList.remove('hidden');
    document.querySelector('.btn_container').classList.add('hidden');

    if (count === 1) {
        document.querySelector('.switch').insertAdjacentHTML('beforeend',
            `<div class="selectData">

                <select name="state" id="state" onchange="generateCities()">

                </select>
                <select name="city" id="city">

                </select>


           <input class="data_submit" type="submit" value="Submit"  onclick="toPage('list_container')">

         </div>`);
    }


    createState();

    ++count;

}

// fetch states from JSON
async function createState() {

    let data = await fetch(stateURl)
    let states = await data.json();
    generateState(states);
}


// Generate data for dropdown
function generateState(states) {

    let stateDrop = document.querySelector('#state');

    for (let state in states) {

        stateDrop.insertAdjacentHTML('beforeend', `
           <option value=${state}>${state}</option>`)
    }
}

// fetch cities from JSON
async function generateCities() {

    let stateDrop = document.querySelector('#state');
    let cityDrop = document.querySelector('#city');
    console.log(stateDrop.value);

    let data = await fetch(stateURl)
    let states = await data.json();

    for (let state in states) {

        if (stateDrop.value === state) {

            states[state].forEach((val) => {

                cityDrop.insertAdjacentHTML('beforeend', `
                <option value=${val}>${val}</option>`)

            })
        }
    }

}

// Onclick function form the Main

function toPage(cls) {
    console.log(cls)
    homeContainer.classList.add('hidden');
    document.querySelector(`.${cls}`).classList.remove('hidden');

    if (cls === `list_container`) {
        let city = document.querySelector('#city').value;
        listBrewery(city);
    }

}

// Event listener for the back to home
back.forEach((v) => {

    v.addEventListener('click', () => {
        homeContainer.classList.remove('hidden');
        v.parentNode.parentNode.classList.add('hidden');
        document.querySelector('.switch').classList.add('hidden');
        document.querySelector('.btn_container').classList.remove('hidden');
    })

});

// Fetching data from the api for list of Brewers

async function listBrewery(city) {

    let data = await fetch(`${apiURL}?by_city=${city}`);
    let list = await data.json()

    // Calling a function to create list section
    creatListOfBrewery(list)

}

// Creating a list breweries in the list container

function creatListOfBrewery(list) {

    list.forEach((v) => {

        //assigning the values to the variables

        let name = v.name;
        let type = v.brewery_type;
        let address = `${v.street},
        ${v.city},${v.state},\n
        ${v.country}`;
        let zipcode = v.postal_code;
        let phone = v.phone;

        //adding HTML to the list section 

        listSection.insertAdjacentHTML('beforeend',


            `<div class="list ">
            <div class="tint ">
            
              <table>
                 <tr>
                    <th class="beerSVG"></th>
                    <th>${name}</th>
                 </tr> 
                <tr>
                    <th class="locationSVG"></th>
                    <td>${address}</td>
                 </tr>
                 <tr>
                    <th class="zipSVG"></th>
                    <td>${zipcode}</td>
                 </tr>
                 <tr>
                    <th class='phoneSVG'></th>
                    <td>${phone}</td>
                 </tr>
                 <tr>
                    <th class="typeSVG"></th>
                    <td>${type}</td>
                  </tr>
             </table>
            </div>
         </div>` )

    })

}

// Creating a search list breweries in the search container

function createSearchOfBrewery() {

    //adding HTML to the list section 
    searchTop.innerHTML = '';

    searchTop.insertAdjacentHTML('beforeend',
        `<div class="search_box">
             <input type='text' class="valueOfInput" placeholder="Please enter the Brewer name">
             <input type='submit' class="searching_btn" onclick="searchBrewery()"    value='search'>
         </div>`)

}

createSearchOfBrewery()

// Fetching data from the api for  Search results

async function searchBrewery() {

    let input = document.querySelector('.valueOfInput');
    let value = input.value;

    let data = await fetch(`${apiURL}/search?query=${value}`);
    let list = await data.json();

    displaySearch(list);
}



//Display the search data

function displaySearch(list) {

    let input = document.querySelector('.valueOfInput');
    input.value = '';

    list.forEach((v) => {

        //assigning the values to the variables

        let name = v.name;
        let type = v.brewery_type;
        let address = `${v.street},
        ${v.city},${v.state},\n
        ${v.country}`;
        let zipcode = v.postal_code;
        let phone = v.phone;

        searchBottom.insertAdjacentHTML('beforeend',
            `<div class="searchList ">
    
    
      <table>
         <tr>
            <th class="beerSVG"></th>
            <th>${name}</th>
         </tr> 
        <tr>
            <th class="locationSVG"></th>
            <td>${address}</td>
         </tr>
         <tr>
            <th class="zipSVG"></th>
            <td>${zipcode}</td>
         </tr>
         <tr>
            <th class='phoneSVG'></th>
            <td>${phone}</td>
         </tr>
         <tr>
            <th class="typeSVG"></th>
            <td>${type}</td>
          </tr>
     </table>
   
 </div>` )

    })

}

