const express = require('express');
const router = express.Router();
const db = require('../database.js');

// Save ITR data
router.post('/', (req, res) => {
    const { grossSalary, deductions80c } = req.body;
    if (grossSalary === undefined || deductions80c === undefined) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const sql = 'INSERT INTO itr_data (gross_salary, deductions_80c) VALUES (?,?)';
    const params = [grossSalary, deductions80c];
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

module.exports = router;
