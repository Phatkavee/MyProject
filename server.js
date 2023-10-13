const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

const base_url = 'http://localhost:4000';

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Doctor
app.get('/Doctors', async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Doctor');
        res.render('Doctor', { Doctors: response.data });
    } catch (err) {      
       console.log(err);
       res.status(500).send(err);
    }
});

app.get('/Doctor/:ID', async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Doctor/' + req.params.ID);
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
        res.redirect('/Doctors');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/updateDoctor/:ID", async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Doctor/' + req.params.ID);
        res.render('updateDoctor', { Doctor: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.post("/updateDoctor/:ID", async(req, res) => {
    try {
        const data = { Name : req.body.Name, Department : req.body.Department };
        await axios.put(base_url + '/Doctor/' + req.params.ID, data);
        res.redirect('/Doctors');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/deleteDoctor/:ID", async(req, res) => {
    try {
        await axios.delete(base_url + '/Doctor/' + req.params.ID);
            res.redirect('/Doctors');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


// Patient
app.get('/Patients', async(req, res) => {    
    try {
        const response = await axios.get(base_url + '/Patient');
        res.render('Patient', { Patients: response.data });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/Patient/:ID', async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Patient/' + req.params.ID);
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
        res.redirect('/Patients');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.post("/updatePatient/:ID", async(req, res) => {
    try {
        const data = { Name : req.body.Name, Disease : req.body.Disease, Symptom : req.body.Symptom };
        await axios.put(base_url + '/Patient/' + req.params.ID, data);
        res.redirect('/Patients');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/deletePatient/:ID", async(req, res) => {
    try {
        await axios.delete(base_url + '/Patient/' + req.params.ID);
            res.redirect('/Patients');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Hospital
app.get('/Hospital', async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Hospital');
        res.render('Hospital', { Hospitals: response.data });
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

app.post("/updateHospital/:PatientId", async(req, res) => {
    try {
        const data = { PatientId : req.body.PatientId, DoctorId : req.body.DoctorId, Treatment : req.body.Treatment };
        await axios.put(base_url + '/Hospital/' + req.params.PatientId, data);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/deleteHospital/:PatientId", async(req, res) => {
    try {
        await axios.delete(base_url + '/Hospital/' + req.params.PatientId);
            res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
});







