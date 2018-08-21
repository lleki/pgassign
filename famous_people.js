const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var args = process.argv[2];


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...");

  client.query(`SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1`, [args], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    var output = result.rows;
    console.log("Found " + output.length + " person(s) by the name " + args);

    for(var x = 0; x < output.length; x++){
      var date = result.rows[x].birthdate;
      var firstName = result.rows[x].first_name;
      var lastName = result.rows[x].last_name;

      console.log(firstName + " " + lastName + ", born " + date.toString().substr(0, 15));

    }
    client.end();
  });
});