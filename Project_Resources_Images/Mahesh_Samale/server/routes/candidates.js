const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const pool = require('../utils/db');
const result = require('../utils/result');
const config = require('../utils/config');

const router = express.Router();

// Candidate Register
router.post('/register', (req, res) => {
    const {
        full_name,
        email,
        password,
        profile_photo_url = "",
        phone_no = "",
        skills_json = "[]",
        education_json = "[]",
        experience_json = "[]",
        links_json = "[]"
    } = req.body;

    if (!email || !password || !full_name) return res.send(result.createResult('Missing required fields'));

    bcrypt.hash(password, config.SALT_ROUND, (err, hashedPassword) => {
        if (err) return res.send(result.createResult(err));
        const user_id = uuidv4();
        const student_id = uuidv4();

        // Insert into Users
        const sqlUsers = `
            INSERT INTO Users (user_id, email, password, role, full_name, profile_photo_url, created_at)
            VALUES (?, ?, ?, 'student', ?, ?, NOW())
        `;
        pool.query(sqlUsers, [user_id, email, hashedPassword, full_name, profile_photo_url], (err, data) => {
            if (err) return res.send(result.createResult(err));
            // Insert into CandidateProfiles
            const sqlProfile = `
                INSERT INTO CandidateProfiles (student_id, user_id, name, phone_no, skills_json, education_json, experience_json, links_json, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
            `;
            pool.query(sqlProfile, [
                student_id,
                user_id,
                full_name,
                phone_no,
                skills_json,
                education_json,
                experience_json,
                links_json
            ], (err2, data2) => {
                if (err2) return res.send(result.createResult(err2));
                res.send(result.createResult(null, { user_id, student_id, email, full_name, phone_no, profile_photo_url }));
            });
        });
    });
});

// Candidate Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.send(result.createResult('Missing email or password'));
    const sql = `SELECT * FROM Users WHERE email = ? AND role = 'student' AND is_deleted = FALSE`;

    pool.query(sql, [email], (err, data) => {
        if (err) return res.send(result.createResult(err));
        if (data.length === 0) return res.send(result.createResult("Invalid Email"));
        const user = data[0];
        bcrypt.compare(password, user.password, (err, passwordStatus) => {
            if (passwordStatus) {
                const payload = {
                    user_id: user.user_id,
                    email: user.email,
                    role: user.role
                };
                const token = jwt.sign(payload, config.SECRET);
                res.send(result.createResult(null, {
                    token,
                    user_id: user.user_id,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role,
                    profile_photo_url: user.profile_photo_url
                }));
            } else {
                res.send(result.createResult('Invalid Password'));
            }
        });
    });
});

// Candidate Profile Fetch (front-end can show/edit)
router.get('/profile/', (req, res) => {
    const user_id = req.headers.user_id;
    if (!user_id) return res.send(result.createResult('User id missing'));

    const sqlUsers = `SELECT user_id, email, full_name, profile_photo_url FROM Users WHERE user_id = ?`;
    const sqlProfile = `SELECT student_id, name, phone_no, skills_json, education_json, experience_json, links_json FROM CandidateProfiles WHERE user_id = ?`;

    pool.query(sqlUsers, [user_id], (err, usersData) => {
        if (err) return res.send(result.createResult(err));
        pool.query(sqlProfile, [user_id], (err2, profileData) => {
            if (err2) return res.send(result.createResult(err2));
            res.send(result.createResult(null, {
                user: usersData[0] || {},
                candidate_profile: profileData[0] || {}
            }));
        });
    });
});

// Candidate Profile Update
router.put('/profile', (req, res) => {
    const user_id = req.headers.user_id;
    const { name, phone_no, skills_json, education_json, experience_json, links_json, profile_photo_url } = req.body;

    // Update CandidateProfiles
    const sqlProfile = `
        UPDATE CandidateProfiles
        SET name = ?, phone_no = ?, skills_json = ?, education_json = ?, experience_json = ?, links_json = ?, updated_at = NOW()
        WHERE user_id = ?
    `;
    pool.query(sqlProfile, [name, phone_no, skills_json, education_json, experience_json, links_json, user_id], (err, data) => {
        if (err) return res.send(result.createResult(err));
        // Update Users table for profile_photo only if provided
        if (profile_photo_url) {
            const sqlUser = `
                UPDATE Users SET full_name = ?, profile_photo_url = ?, updated_at = NOW()
                WHERE user_id = ?
            `;
            pool.query(sqlUser, [name, profile_photo_url, user_id], (err2, data2) => {
                if (err2) return res.send(result.createResult(err2));
                res.send(result.createResult(null, { profile: data, user: data2 }));
            });
        } else {
            // Only profile update
            res.send(result.createResult(null, { profile: data }));
        }
    });
});

module.exports = router;
