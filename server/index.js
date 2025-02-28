const express = require('express');
    const sqlite3 = require('sqlite3').verbose();
    const cors = require('cors');

    const app = express();
    const port = 3000;

    app.use(cors());
    app.use(express.json());

    // Database setup
    const db = new sqlite3.Database('./food_waste.db', (err) => {
      if (err) {
        console.error('Database connection error:', err.message);
      } else {
        console.log('Connected to the SQLite database.');
        db.run(`
          CREATE TABLE IF NOT EXISTS food_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            quantity INTEGER,
            expiry TEXT
          )
        `, (err) => {
          if (err) {
            console.error('Table creation error:', err.message);
          } else {
            console.log('Food items table created or already exists.');
          }
        });
      }
    });

    // API endpoints
    app.get('/api/foodItems', (req, res) => {
      db.all('SELECT * FROM food_items', (err, rows) => {
        if (err) {
          console.error('Error fetching food items:', err.message);
          res.status(500).json({ error: 'Failed to fetch food items' });
          return;
        }
        res.json(rows);
      });
    });

    app.post('/api/foodItems', (req, res) => {
      const { name, quantity, expiry } = req.body;
      db.run('INSERT INTO food_items (name, quantity, expiry) VALUES (?, ?, ?)', [name, quantity, expiry], function(err) {
        if (err) {
          console.error('Error adding food item:', err.message);
          res.status(500).json({ error: 'Failed to add food item' });
          return;
        }
        res.json({ id: this.lastID, name, quantity, expiry });
      });
    });

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });

    // Close the database connection on server shutdown
    process.on('SIGINT', () => {
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
      });
    });
