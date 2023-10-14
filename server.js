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
        res.render('Doctors', { Doctors: response.data });
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
        const patientsData = await axios.get(base_url + '/Patient');
        res.render('Patients.ejs', { Patients: patientsData.data });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/Patient/:ID', async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Patient/' + req.params.ID);
        res.render('Patient.ejs', { Patient: response.data });
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
        const data = { Name : req.body.Name, Disease : req.body.Disease, Symptoms : req.body.Symptoms };
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
app.get('/', async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Hospital');
        res.render('Hospitals', { Hospitals: response.data });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/Hospital/:PatientID', async(req, res) => {
    try {
        const response = await axios.get(base_url + '/Hospital/' + req.params.PatientID);
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
        const data = { PatientID : req.body.PatientID, DoctorID : req.body.DoctorID, Treatment : req.body.Treatment };
        await axios.post(base_url + '/Hospital', data);
        res.redirect('/Hospital');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/updateHospital/:PatientID", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/Hospital/' + req.params.PatientID);
            res.render('updateHospital', { Hospital: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('err');
    }
});

app.post("/updateHospital/:PatientID", async(req, res) => {
    try {
        const data = { PatientID : req.body.PatientID, DoctorID : req.body.DoctorID, Treatment : req.body.Treatment };
        await axios.put(base_url + '/Hospital/' + req.params.PatientID, data);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/deleteHospital/:PatientID", async(req, res) => {
    try {
        await axios.delete(base_url + '/Hospital/' + req.params.PatientID);
            res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
});







