const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = 'jsonwebtoken'; // require('jsonwebtoken');
const db = require('../database.js');

// Register a new user
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    db.get('SELECT email FROM users WHERE email = ?', [email], async (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        if (row) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = 'INSERT INTO users (email, password) VALUES (?,?)';
        const params = [email, hashedPassword];
        db.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error":err.message})
                return;
            }
            res.json({
                "message": "success",
                "data": { id: this.lastID }
            })
        });
    });
});

// Login a user
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], async (err, user) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create a JWT token
        // const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: 3600 });
        // res.json({ token, user: { id: user.id, email: user.email } });
        res.json({ "message": "success" });
    });
});

module.exports = router;
