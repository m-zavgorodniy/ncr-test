const fetch = require('node-fetch');
const config = require('./config');

// gets the list of all countries 
const listAll = async () => {
  const apiRef = `${config.API_ENTRY_URL}/countries`;

  try {
    // go async - wait for the result
    const response = await fetch(apiRef);
    const result = await response.json();

    // now print
    result.countries.forEach((country) => {
      if (country.includes(' ')) {
        console.log(`"${country}"`);
      } else {
        console.log(country);
      }

    });
  } catch (error) {
    console.log(error);
  }
}

const getPopulations = (countries) => {
  // trying to be nice adding a clue to the error message
  const errorClue = `Enclose the country name in quotes if it consists of more than one word like "United Kingdom". Use the -l option to get the list of available country names`;
  // pile up parallel requests to the API
  const populations = countries.map((country) => _requestPopulation(country));
  // wait for all the requests to complete then print the results out
  Promise.all(populations)
    .then((populations) => {
      // sort by population descending
      populations.sort((a, b) => {
        // let's display errors per country just send them to the end of the list with -1
        return (b.error ? -1 : b.population) - (a.error ? -1 : a.population);
      });
      populations.forEach((country) => {
        if (country.error) {
           console.log(`${country.name}: Error: ${country.error}. ${errorClue}`);
        } else {
          console.log(`${country.name}: ${country.population}`)
        }
      })
    })
    .catch((error) => {
      console.log(error)
    })

}

// for a given country, requests its population from API
const _requestPopulation = (country) => {
  const today = new Date().toISOString().substring(0, 10); // UTC date in YYYY-MM-DD
  const apiRef = `${config.API_ENTRY_URL}/population/${country}/${today}/`;

  return new Promise((resolve, reject) => {
    let hasError;
    return fetch(apiRef)
      .then((response) => {
        hasError = (response.status !== 200);
        return response.json();
      })
      .then((json) => resolve(
        hasError ?
          { name: country, error: json.detail} :
          { name: country, population: json.total_population.population }
      ))
      .catch((error) => reject(error))
  });
}

module.exports = {
  listAll,
  getPopulations
}

