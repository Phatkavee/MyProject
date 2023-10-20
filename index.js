const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./db.sqlite');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.run(`CREATE TABLE IF NOT EXISTS Doctor (
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Department TEXT NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS Patient (
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Symptoms TEXT NOT NULL,
    Disease TEXT NOT NULL,
    Treatment TEXT NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS Hospital (
    DoctorID INTEGER NOT NULL,
    PatientID INTEGER NOT NULL,
    PRIMARY KEY (DoctorID, PatientID)
)`);


//CRUD for Doctor
app.get('/Doctor', (req, res,) => {
    db.all('SELECT * FROM Doctor', (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.json(rows);
        }
    });
});

app.get('/Doctor/:ID', (req, res,) => {
    db.get('SELECT * FROM Doctor WHERE ID = ?',[req.params.ID], (err, row) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.json(row);
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

app.put('/Doctor/:ID', (req, res,) => {
    const Doctor = req.body;
    db.run('UPDATE Doctor SET Name = ?, Department = ? WHERE ID = ?', [Doctor.Name, Doctor.Department, req.params.ID], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Doctor updated');
        }
    });
});

app.delete('/Doctor/:ID', (req, res,) => {
    db.run('DELETE FROM Doctor WHERE ID = ?', [req.params.ID], (err) => {
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
            return res.json(rows);
        }
    });
});

app.get('/Patient/:ID', (req, res,) => { 
    db.get('SELECT * FROM Patient WHERE ID = ?',[req.params.ID], (err, row) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.json(row);
        }
    });
});

app.post('/Patient', (req, res,) => {
    const { Name, Disease, Symptoms, Treatment } = req.body;
    db.run('INSERT INTO Patient (Name, Disease, Symptoms, Treatment) VALUES (?, ?, ?, ?)', [Name, Disease, Symptoms,Treatment], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Patient added');
        }
    });
});

app.put('/Patient/:ID', (req,res) => {
    const Patient = req.body;
    db.run('UPDATE Patient SET Name = ?, Disease = ?, Symptoms = ?, Treatment = ? WHERE ID = ?', [Patient.Name, Patient.Disease, Patient.Symptoms, Patient.Treatment, req.params.ID], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Patient updated');
        }
    });
});

app.delete('/Patient/:ID', (req, res,) => {
    db.run('DELETE FROM Patient WHERE ID = ?', [req.params.ID], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Patient deleted');
        }
    });
});


//CRUD for Hospital
app.get('/Hospitals', (req, res,) => {
    db.all('SELECT * FROM Hospital', (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.json(rows);
        }
    });
});

app.get('/Hospital/:DoctorID', (req, res) => {
    db.get('SELECT * FROM Hospital WHERE DoctorID = ?', req.params.DoctorID, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Hospital Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.get('/Hospital', (req, res,) => {
    db.all('SELECT Doctor.Name AS DoctorName, GROUP_CONCAT(Patient.Name) AS PatientName FROM Hospital INNER JOIN Doctor ON Hospital.DoctorID = Doctor.ID INNER JOIN Patient ON Hospital.PatientID = Patient.ID GROUP BY Doctor.ID', (err, row) => {
        if (err) {
            return res.status(500).send(err);   
        } else {
            return res.json(row);
        }
    });
});

app.post('/Hospital', (req, res,) => {
    const { DoctorID, PatientID } = req.body;
    db.run('INSERT INTO Hospital (DoctorID, PatientID) VALUES (?, ?)', [DoctorID, PatientID ], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('added to Hospital');
        }
    });
});

app.put('/Hospital/:DoctorID', (req, res,) => {
    const Hospital = req.body;
    db.run('UPDATE Hospital SET DoctorID = ?, PatientID = ? WHERE DoctorID = ?', [Hospital.DoctorID, Hospital.PatientID, req.params.DoctorID], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Hospital updated');
        }
    });
});

app.delete('/Hospital/:DoctorID', (req, res,) => {
    db.run('DELETE FROM Hospital WHERE DoctorID = ?', [req.params.DoctorID], (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.send('Hospital deleted');
        }
    });
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
