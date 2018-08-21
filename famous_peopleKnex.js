
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

var args = process.argv[2];


knex('famous_people')
.select()
.where('first_name', args)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  var output = rows;
  console.log("Searching...");
    console.log("Found " + output.length + " person(s) by the name " + args);

    for(var x = 0; x < output.length; x++){
      var date = rows[x].birthdate;
      var firstName = rows[x].first_name;
      var lastName = rows[x].last_name;

      console.log(firstName + " " + lastName + ", born " + date.toString().substr(0, 15));
    }

});



