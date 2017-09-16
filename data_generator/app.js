var async = require('async');
var faker = require('faker');
var pg = require('pg');
var PromiseArrays = require('promise-arrays');

var config = {
    user: process.env.db_user,
    host: process.env.db_host,
    database: process.env.db_name,
    port: process.env.db_port
};

// Create a pool.
var pool = new pg.Pool(config);

var users = [];

function randRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

pool.connect(function (err, client, done) {
    var finish = function () {
        done();
        process.exit();
    };

    if (err) {
        console.error('could not connect to cockroachdb', err);
        finish();
    }

    Array(1000).fill().map((_, i) => {
        users.push({
            name: faker.name.findName(),
            age: randRange(20, 60),
            canadian_work_years: randRange(0, 2),
            clb_english_score: randRange(4, 10),
            clb_french_score: randRange(4, 10),
            employment_arranged: faker.random.boolean(),
            immediate_siblings_living_in_canada: faker.random.boolean(),
            native_work_experience_years: randRange(0, 5),
            nominated_for_pns: faker.random.boolean(),
            trade_occupations_certificate: faker.random.boolean(),
        });
    });

    var promise = PromiseArrays.map(users, function (user, index) {
        return new Promise(function (resolve, reject) {
            client.query(`INSERT INTO users (id, name, age, canadian_work_years, clb_english_score, clb_french_score, employment_arranged, immediate_siblings_living_in_canada, native_work_experience_years, nominated_for_pns, trade_occupations_certificate) VALUES (${index}, '${user.name}', ${user.age}, ${user.canadian_work_years}, ${user.clb_english_score}, ${user.clb_french_score}, ${user.employment_arranged}, ${user.immediate_siblings_living_in_canada}, ${user.native_work_experience_years}, ${user.nominated_for_pns}, ${user.trade_occupations_certificate})`, resolve);
            });
        });
    }).then(function (result) {
        finish();
    });
});
