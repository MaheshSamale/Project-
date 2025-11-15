const express = require('express')
const pool = require('../utils/db');
const result = require('../utils/results');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();


// Create Candidate profile
router.post('/', (req, res) => {
    const { email, name, skills_json, education_json, experience_json, links_json } = req.body

    const userSql = 'SELECT user_id FROM Users WHERE email = ? AND is_deleted = 0'
    pool.query(userSql, [email], (err, data) => {
        if (err) return res.send(result.createResult(err));
        if (data.length === 0) return res.send(result.createResult('User not found'))

        const user_id = data[0].user_id
        const student_id = uuidv4()

        const sql = `INSERT INTO CandidateProfiles (student_id, user_id, name, skills_json, education_json, experience_json, links_json, is_deleted, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())`

        pool.query(sql, [student_id, user_id, name, skills_json, education_json, experience_json, links_json],
            (err, data) => {
                if (err) return res.send(result.createResult(err));
                res.send(result.createResult(err, data));
            }
        )
    })
})

// get all Candidate
router.get('/', (req, res) => {
    const sql = `SELECT * FROM CandidateProfiles WHERE is_deleted = 0`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data));
    });
});

// Fetch candidate profile by user id
router.get('//me/profile', (req, res) => {
    const { user_id } = req.param
    if (!user_id) return res.send(result.createResult('Missing user_id'))
    const sql = `SELECT student_id, user_id, name, skills_json, education_json,  experience_json,  links_json, created_at, updated_at FROM CandidateProfiles WHERE user_id = ? AND is_deleted = 0`
    pool.query(sql, [user_id], (err, data) => {
        if (err) return res.send(result.createResult(err))
        if (data.length === 0) return res.send(result.createResult('Candidate profile not found'))
        res.send(result.createResult(null, data[0]))
    })
})

//Update candidate profile fields
router.put('/me/profile', (req, res) => {
    const { user_id } = req.params
    const { name, skills_json, education_json, experience_json, links_json } = req.body

    if (!user_id) return res.send(result.createResult('Missing user_id'));

    const sql = `UPDATE CandidateProfiles SET name = COALESCE(?, name), skills_json = COALESCE(?, skills_json),education_json = COALESCE(?, education_json),
            experience_json = COALESCE(?, experience_json),
            links_json = COALESCE(?, links_json),
            updated_at = NOW()
            WHERE user_id = ? AND is_deleted = 0`

    const params = [name, skills_json, education_json, experience_json, links_json, user_id]

    pool.query(sql, params, (err, data) => {
        if (err) return res.send(result.createResult(err))
        if (data.affectedRows === 0) return res.send(result.createResult('Candidate profile not found or already deleted'))

        res.send(result.createResult(null, { message: "Candidate profile updated successfully" }))
    })
})




module.exports = router