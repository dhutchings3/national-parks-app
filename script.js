'use strict';

const apiKey = '0x7Lm9i1y5khpeXaO1ICLlWLX88EqVWMrOnfzHCi'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
      </li>
    `)};
  $('#results').removeClass('hidden');
};

function getNationalParks(query, limit=10) {
  const params = {
    api_key: apiKey,
    q: query,
    limit,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-limit').val();
    getNationalParks(searchTerm, limit);
  });
}

$(watchForm);