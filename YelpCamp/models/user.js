const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pg = require('pg');

var pool = pg.Pool({
    user:"",
    host: "localhost",
    database: 'yelpcamp',
    password:"",
    port: "5432"
});
pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
})

const postgresLocal = require('passport-local-postgres')(pool);

module.exports = postgresLocal;