const express = require('express');
const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('mydatabase.db');

db.run(`CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY,
  eventName TEXT,
  Prelim TEXT,
  dayTimeOfEvent TEXT,
  top12 TEXT,
  qualifierForNationals TEXT,
  finals TEXT,
  dayTimeOfInterview TEXT,
  pred TEXT,
  finalResults TEXT
)`);

// Get all events
app.get('/events', (req, res) => {
  const sql = 'SELECT * FROM events';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Create a new event
app.post('/events', (req, res) => {
  const {
    eventName,
    Prelim,
    dayTimeOfEvent,
    top12,
    qualifierForNationals,
    finals,
    dayTimeOfInterview,
    pred,
    finalResults,
  } = req.body;
  const sql =
    'INSERT INTO events (eventName, Prelim, dayTimeOfEvent, top12, qualifierForNationals, finals, dayTimeOfInterview, pred, finalResults) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.run(
    sql,
    [
      eventName,
      Prelim,
      dayTimeOfEvent,
      top12,
      qualifierForNationals,
      finals,
      dayTimeOfInterview,
      pred,
      finalResults,
    ],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log('Event created successfully');
      res.json({ message: 'Event created successfully' });
    }
  );
});

// Update an existing event
app.put('/events/:id', (req, res) => {
  const {
    eventName,
    Prelim,
    dayTimeOfEvent,
    top12,
    qualifierForNationals,
    finals,
    dayTimeOfInterview,
    pred,
    finalResults,
  } = req.body;
  const sql =
    'UPDATE events SET eventName = ?, Prelim = ?, dayTimeOfEvent = ?, top12 = ?, qualifierForNationals = ?, finals = ?, dayTimeOfInterview = ?, pred = ?, finalResults = ? WHERE id = ?';
  db.run(
    sql,
    [
      eventName,
      Prelim,
      dayTimeOfEvent,
      top12,
      qualifierForNationals,
      finals,
      dayTimeOfInterview,
      pred,
      finalResults,
      req.params.id,
    ],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Event updated successfully' });
    }
  );
});

// Delete an event
app.delete('/events/:id', (req, res) => {
  const sql = 'DELETE FROM events WHERE id = ?';
  db.run(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Event deleted successfully' });
  });
});

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

// Start the server
app.listen(3020, () => {
  console.log('Server running on port 3020');
});
