const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./db.sqlite');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.run(`CREATE TABLE IF NOT EXISTS Doctor (
    Id INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Department TEXT NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS Patient (
    Id INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Disease TEXT NOT NULL,
    Symptoms TEXT NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS Hospital (
    DoctorId INTEGER NOT NULL,
    PatientId INTEGER NOT NULL,
    Treatment TEXT NOT NULL
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
    db.get('SELECT * FROM Doctor WHERE Id = ?',[req.params.id], (err, row) => {
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

app.put('/Patient/:id', (req,res) => {
    const Patient = req.body;
    db.run('UPDATE Patient SET Name = ?, Disease = ?, Symptoms = ? WHERE Id = ?', [Patient.Name, Patient.Disease, Patient.Symptoms, req.params.id], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Patient updated');
        }
    });
});

app.delete('/Patient/:id', (req, res,) => {
    db.run('DELETE FROM Patient WHERE Id = ?', [req.params.id], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Patient deleted');
        }
    });
});


//CRUD for Hospital
app.get('/Hospital', (req, res,) => {
    db.all('SELECT * FROM Hospital', (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send(rows);
        }
    });
});

app.get('/Hospital/:id', (req, res,) => {
    db.get('SELECT * FROM Hospital WHERE DoctorId = ?',[req.params.id], (err, row) => {
        if (err) {
            return res.status(500).send(err);   
        } else {
            return res.send(row);
        }
    });
});

app.post('/Hospital', (req, res,) => {
    const { DoctorId, PatientId, Treatment } = req.body;
    db.run('INSERT INTO Hospital (DoctorId, PatientId, Treatment) VALUES (?, ?, ?)', [req.body.DoctorId, req.body.PatientId, req.body.Treatment], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('added to Hospital');
        }
    });
});

app.put('/Hospital/:id', (req, res,) => {
    const Hospital = req.body;
    db.run('UPDATE Hospital SET DoctorId = ?, PatientId = ?, Treatment = ? WHERE DoctorId = ?', [Hospital.DoctorId, Hospital.PatientId, Hospital.Treatment, req.params.id], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Hospital updated');
        }
    });
});

app.delete('/Hospital/:id', (req, res,) => {
    db.run('DELETE FROM Hospital WHERE DoctorId = ?', [req.params.id], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Hospital deleted');
        }
    });
});



const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
