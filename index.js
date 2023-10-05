const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./db.sqlite');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.run(`CREATE TABLE IF NOT EXISTS Doctor (
    Id INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Department TEXT NOT NULL,
    )`);

db.run(`CREATE TABLE IF NOT EXISTS Patient (
    Id INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Disease TEXT NOT NULL,
    Symptoms TEXT NOT NULL,
    )`);

db.run(`CREATE TABLE IF NOT EXISTS Hospital (
    DoctorId INTEGER NOT NULL,
    PatientId INTEGER NOT NULL,
    Treatment TEXT NOT NULL,
    )`);


//CRUD for Doctor
app.get('/Doctor', (req, res,) => {
    db.all('SELECT * FROM Doctor', (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send(rows);
        }
    });
});

app.get('/Doctor/:id', (req, res,) => {
    db.get('SELECT * FROM Doctor WHERE Id = ?'[req.params.id], (err, row) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send(row);
        }
    });
});

app.post('/Doctor', (req, res,) => {
    const { Name, Department } = req.body;
    db.run('INSERT INTO Doctor (Name, Department) VALUES (?, ?)', [Name, Department], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Doctor added');
        }
    });
});

app.put('/Doctor/:id', (req, res,) => {
    const Doctor = req.body;
    db.run('UPDATE Doctor SET Name = ?, Department = ? WHERE Id = ?', [Doctor.Name, Doctor.Department, req.params.id], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Doctor updated');
        }
    });
});

app.delete('/Doctor/:id', (req, res,) => {
    db.run('DELETE FROM Doctor WHERE Id = ?', [req.params.id], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Doctor deleted');
        }
    });
});


//CRUD for Patient
app.get('/Patient', (req, res,) => {
    db.all('SELECT * FROM Patient', (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send(rows);
        }
    });
});

app.get('/Patient/:id', (req, res,) => {
    db.get('SELECT * FROM Patient WHERE Id = ?'[req.params.id], (err, row) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.json(row);
        }
    });
});

app.post('/Patient', (req, res,) => {
    const { Name, Disease, Symptoms } = req.body;
    db.run('INSERT INTO Patient (Name, Disease, Symptoms) VALUES (?, ?, ?)', [Name, Disease, Symptoms], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Patient added');
        }
    });
});

