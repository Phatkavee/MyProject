const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

const base_url = 'http://localhost:5000';

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Doctor
app.get('/Doctors', async(req, res) => {
    try {
        const doctordata = await axios.get(base_url + '/Doctor');
        res.render('Doctors', { Doctors: doctordata.data });
    } catch (err) {      
       console.log(err);
       res.status(500).send(err);
    }
});

app.get('/Doctor/:ID', async(req, res) => {
    try {
        const doctordata = await axios.get(base_url + '/Doctor/' + req.params.ID);
        res.render('Doctor', { Doctor: doctordata.data});
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
        const doctordata = { Name : req.body.Name, Department : req.body.Department };
        await axios.post(base_url + '/Doctor', doctordata);
        res.redirect('/Doctors');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/updateDoctor/:ID", async(req, res) => {
    try {
        const doctordata = await axios.get(base_url + '/Doctor/' + req.params.ID);
        res.render('updateDoctor', { Doctor: doctordata.data });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.post("/updateDoctor/:ID", async(req, res) => {
    try {
        const doctordata = { Name : req.body.Name, Department : req.body.Department };
        await axios.put(base_url + '/Doctor/' + req.params.ID, doctordata);
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
        const patientdata = await axios.get(base_url + '/Patient');
        res.render('Patients', { Patients: patientdata.data });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/Patient/:ID', async(req, res) => {
    try {
        const patientdata = await axios.get(base_url + '/Patient/' + req.params.ID);
        res.render('Patient', { Patient: patientdata.data });
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
        const patientdata = { Name : req.body.Name, Disease : req.body.Disease, Symptoms : req.body.Symptoms, Treatment : req.body.Treatment };
        await axios.post(base_url + '/Patient', patientdata);
        res.redirect('/Patients');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/updatePatient/:ID", async (req, res) => {
    try {
        const patientdata = await axios.get(
            base_url + '/Patient/' + req.params.ID);
            res.render('updatePatient', { Patient: patientdata.data });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.post("/updatePatient/:ID", async(req, res) => {
    try {
        const patientdata = { Name : req.body.Name, Disease : req.body.Disease, Symptoms : req.body.Symptoms, Treatment : req.body.Treatment };
        await axios.put(base_url + '/Patient/' + req.params.ID, patientdata);
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
        const hospitaldata = await axios.get(base_url + '/Hospitals');
        res.render('Hospitals', { Hospitals: hospitaldata.data });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/Hospital', async(req, res) => {
    try {
        const hospitaldata = await axios.get(base_url + '/Hospital');
        const doctordata = await axios.get(base_url + '/Doctor');
        const patientdata = await axios.get(base_url + '/Patient');
        res.render('Hospital', { Hospital: hospitaldata.data, Hospitals: hospitaldata.data, Doctors: hospitaldata.data, Patients: hospitaldata.data});
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
        const hospitaldata = { DoctorID : req.body.DoctorID, PatientID : req.body.PatientID };
        await axios.post(base_url + '/Hospital', hospitaldata);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/updateHospital/:DoctorID", async (req, res) => {
    try {
        const hospitaldata = await axios.get(base_url + '/Hospital/' + req.params.DoctorID);
        res.render('updateHospital', { Hospital: hospitaldata.data });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.post("/updateHospital/:DoctorID", async(req, res) => {
    try {
        const hospitaldata = { DoctorID : req.body.DoctorID, PatientID : req.body.PatientID };
        await axios.put(base_url + '/Hospital/' + req.params.DoctorID, hospitaldata);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/deleteHospital/:DoctorID", async(req, res) => {
    try {
        await axios.delete(base_url + '/Hospital/' + req.params.DoctorID);
            res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


app.listen(8000, () => {
    console.log('Listening on port 8000');
});
