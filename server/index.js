const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')

const token = process.env.TOKEN;

app.use(bodyParser.json());

app.get('/hook', async (req, res) => {
    if(req.query.token !== token){
        return res.sendStatus(401);
    }

    let { data } = await axios.get(process.env.API_URL + '/projects');
    let projects = data;

    console.log(projects);

    return res.end(req.query.challenge);
});

app.post('/hook', (req, res) => {
    if(req.query.token !== token){
        return res.sendStatus(401);
    }

    console.log(req.body);

    res.end('');
});
  
module.exports = {
    path: '/api',
    handler: app
}
