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

app.post('/hook', async (req, res) => {
    if(req.query.token !== token){
        return res.sendStatus(401);
    }

    let pushdata = req.body;

    let { data: project } = await axios.get(process.env.API_URL + '/projects?repo=' + pushdata.repository.ssh_url);

    project = project[0];

    let currentpush = await axios.post(process.env.API_URL + '/pushes', {
      pulled: false,
      projectId: project.id,
      data: pushdata
    });

    res.end('');
});
  
module.exports = {
    path: '/api',
    handler: app
}
