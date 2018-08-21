
const settings = require("./settings"); // settings.json


var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
  }
});

var args = process.argv.slice(2);

console.log('Args is ' + args);
knex('famous_people')
.insert({first_name: args[0], last_name: args[1], birthdate: args[2]})
.then(function(){
  console.log('inserted');
});
// .asCallback(function(err, rows) {
//   if (err) return console.error(err);
//   var output = rows;


// });



