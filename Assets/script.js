///Vars and QuerySelectors
var searchBtn = document.querySelector('.btn')
var searchInput = document.querySelector('.search-bar').value
var mainTable = document.querySelector('.DTable')
var searchFormEl = document.querySelector('#form-control.search-bar')
var query = document.getElementById('search-query')
console.log(query.value);

var searchBtn = document.querySelector('.btn')
var searchInput = document.querySelector('.search-bar').value

// Event listener for specifying whether to search in restaurants or in recipes
searchBtn.addEventListener('click', function () {
  var recDD = document.querySelector('.form-select.options');
  document.getElementById('results').style.display = "block";
  
  if (recDD.value === 'Recipes') {
    recAPI(query.value);
    console.log("sear.che.d");
  }
});

searchBtn.addEventListener('click', function () {
  var recDD = document.querySelector('.form-select.options');
  document.getElementById('results').style.display = "block";
  if (recDD.value === 'Restaurants') {
    yelpApi();
    displaySearch();
    console.log("searc..hed");
  }
});


function yelpApi() {
  ////Yelp api
  const options = {

    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer vfgkv3uNaJ7w04xue0Ufm9QNGHG_wJw1eTd5mTpPHQrqtRVKzHy7xlIoq6XjB77G1sFz9n2AiDnKUmelVosa-EXZGVK57fpTyvPvP-MpeA5f9O9KaySkNME3nx0-ZHYx'
    },

  };

  fetch('https://cors-anywhere-jung.herokuapp.com/' + 'https://api.yelp.com/v3/businesses/search?location=ATL&sort_by=best_match&limit=15', options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displaySearch(data);
    })
}

//Function for search event listioner
function displaySearch(results) {
  console.log(results)
  for (var i = 0; i < results.businesses.length; i++) {
    console.log('hi')
    var businessname = results.businesses[i].name
    var tableRowEL = document.createElement('tr');
    var number = document.createElement('th');
    var listEL = document.createElement('th');
    var information = document.createElement('th');
    var alais = results.businesses[i].alais
    var mainTable = document.querySelector('.DTable')

    //  //Adding text
    number.textContent = results.businesses[i].rating + " (" + results.businesses[i].price + ")";
    listEL.innerHTML = businessname;
    //information.innerHTML = alais;
    //Appending Childs
    mainTable.appendChild(tableRowEL);
    tableRowEL.appendChild(listEL);
    tableRowEL.appendChild(number);
    tableRowEL.appendChild(information);

  }
};

function recAPI() {
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/recipe?query=' + query.value,
    headers: { 'X-Api-Key': 'F5CKn12AgwSZC8GGz3tjjhcXV003W8UbygRaxbTu' },
    contentType: 'application/json',
    success: function (result) {
      recDisplay(result);
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
}

function recDisplay(response) {
  console.log(response);
  for (var i = 0; i < response.length; i++) {
    console.log('one time')
    var recName = response[i].title;
    var info = response[i].servings;
    var content = `
        <tr>
         <th>
          ${response[i].title}
         </th>
         <th>
         ${response[i].servings}
        </th>
        </tr>`
    //  //Adding text
    mainTable.innerHTML += content
  }
};

// localStorage for previous searches
searchBtn.addEventListener('click', function () {
  var savedSearches = document.getElementById('search-query').value;
  localStorage.setItem('searches', JSON.stringify(savedSearches));
})

var searchList = localStorage.getItem('searches');
document.getElementById('search1').innterHTML = searchList;

var searchItem = JSON.parse(localStorage.getItem("searches"))
$("#search1").text(searchItem);