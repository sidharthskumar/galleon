const express = require('express')
const app = express()
const pg = require('pg')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const cockroachdbConfig = {
    user: process.env.db_user,
    host: process.env.db_host,
    database: process.env.db_name,
    port: process.env.db_port
}
const pool = new pg.Pool(cockroachdbConfig)

var pgClientPromise = pool.connect()
Promise.all([pgClientPromise]).then((resolvedValues) => {
    [pgClient] = resolvedValues

    // begin routes here
    app.get('/', (req, res) => {
        res.send("Hello world!")
    })

    app.post('/find_mentor', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        const givenUser = req.body
        pgClient.query("SELECT * from users", (err, users) => {
            let bestUser = null
            let lowestDistance = 999999999999999
            users.rows.forEach((user, index) => {
                const distance = Math.abs(user.age - givenUser.age)
                             + Math.abs(user.canadian_work_years - givenUser.canadian_work_years)
                             + Math.abs(user.clb_english_score - givenUser.clb_english_score)
                             + Math.abs(user.clb_french_score - givenUser.clb_french_score)
                             + Math.abs(user.native_work_experience_years - givenUser.native_work_experience_years)
                             + user.employment_arranged == givenUser.employment_arranged ? 0 : 5
                             + user.immediate_siblings_living_in_canada == givenUser.immediate_siblings_living_in_canada ? 0 : 5
                             + user.nominated_for_pns == givenUser.nominated_for_pns ? 0 : 5
                             + user.trade_occupations_certificate == givenUser.trade_occupations_certificate ? 0 : 5

                if (distance < lowestDistance) {
                    lowestDistance = distance
                    bestUser = user
                }
            })
            res.send(bestUser)
        })
    })

    app.listen(3001, () => {
      console.log('Example app listening on port 3001!')
    })
})
