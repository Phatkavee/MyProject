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
        const response = await axios.get(base_url + '/Doctor');
        res.render('Doctor', { Doctor: response.data });
    } catch (err) {      
       console.log(err);
       res.status(500).send(err);
    }
});

app.get('/Doctor/:id', async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Doctor' + req.params.id);
        res.render('Doctor', { Doctor: response.data });
    } catch (err) {      
       console.error(err);
       res.status(500).send(err);
    }
});

app.get("/createDoctor", async(req, res) => {
    res.render('createDoctor');
});

app.post("/createDoctor", async(req, res) => {
    try {
        const data = { Name : req.body.Name, Department : req.body.Department };
        await axios.post(base_url + '/Doctor', data);
        res.redirect('/Doctor');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/updateDoctor/:id", async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Doctor/' + req.params.id);
        res.render('updateDoctor', { Doctor: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.post("/updateDoctor/:id", async(req, res) => {
    try {
        const data = { Name : req.body.Name, Department : req.body.Department };
        await axios.put(base_url + '/Doctor/' + req.params.id, data);
        res.redirect('/Doctor');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/deleteDoctor/:id", async(req, res) => {
    try {
        await axios.delete(base_url + '/Doctor/' + req.params.id);
            res.redirect('/Doctor');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Patient
app.get('/Patient', async(req, res) => {    
    try {
        const response = await axios.get(base_url + '/Patient');
        res.render('Patient', { Patient: response.data });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/Patient/:id', async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Patient/' + req.params.id);
        res.render('Patient', { Patient: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/createPatient", async(req, res) => {
    res.render('createPatient');
});

app.post("/createPatient", async(req, res) => {
    try {
        const data = { Name : req.body.Name, Disease : req.body.Disease, Symptom : req.body.Symptom };
        await axios.post(base_url + '/Patient', data);
        res.redirect('/Patient');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/updatePatient/:id", async(req, res) => {
    try {
        const data = { Name : req.body.Name, Disease : req.body.Disease, Symptom : req.body.Symptom };
        await axios.put(base_url + '/Patient/' + req.params.id, data);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/deletePatient/:id", async(req, res) => {
    try {
        await axios.delete(base_url + '/Patient/' + req.params.id);
            res.redirect('/Patient');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Hospital
app.get('/Hospital', async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Hospital');
        res.render('Hospital', { Hospital: response.data });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/Hospital/:PatientId', async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Hospital/' + req.params.PatientId);
        res.render('Hospital', { Hospital: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/createHospital", async(req, res) => {
    res.render('createHospital');
});

app.post("/createHospital", async(req, res) => {
    try {
        const data = { PatientId : req.body.PatientId, DoctorId : req.body.DoctorId, Treatment : req.body.Treatment };
        await axios.post(base_url + '/Hospital', data);
        res.redirect('/Hospital');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/updateHospital/:PatientId", async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Hospital/' + req.params.PatientId);
        res.render('updateHospital', { Hospital: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.post("/updateHospital/:PatientId", async(req, res) => {
    try {
        const data = { PatientId : req.body.PatientId, DoctorId : req.body.DoctorId, Treatment : req.body.Treatment };
        await axios.put(base_url + '/Hospital/' + req.params.PatientId, data);
        res.redirect('/Hospital');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/deleteHospital/:PatientId", async(req, res) => {
    try {
        await axios.delete(base_url + '/Hospital/' + req.params.PatientId);
            res.redirect('/Hospital');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
});







