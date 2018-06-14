const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const token = process.env.TOKEN;

app.use(bodyParser.json());

app.get('/hook', (req, res) => {
    if(req.query.token !== token){
        return res.sendStatus(401);
    }

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
