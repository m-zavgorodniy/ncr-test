const program = require('commander');
const api = require('./api');

program
  .version('0.0.1')
  .description('World\'s countries\' populations')
  .usage('[options] [<country [<country> ...]>]')
  .option('-l, --list', 'output the list of all countries');

program
  .parse(process.argv)

const countries = program.args;
const doPrint = program.list;

if (countries.length || doPrint) {
  (async () => {

    // get all countries and print if requested
    if (doPrint) {
      // we need the list above the populations info, so wait 
      await api.listAll(doPrint);
    }

    // now get populations per country in the args
    if (countries.length) {
      api.getPopulations(countries);
    }

  })();

} else {
  program.help();
}

