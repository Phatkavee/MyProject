const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

const base_url = 'http://localhost:4000';

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Doctor
app.get('/Doctor', async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Doctor' + req.params.id);
        res.render('Doctor', { Doctor: response.data });
    } catch (error) {      
       console.error(err);
       res.status(500).send(err);
    }
});