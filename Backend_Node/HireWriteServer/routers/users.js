const fs = require('fs');
const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')
const congig = require('../utils/congig')

const pool = require('../utils/db');
const result = require('../utils/results');

const router = express.Router();
const saltRounds = 10;

const upload = multer({ dest: 'uploads' });

// Register user
router.post('/register', (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) return res.send(result.createResult('Missing fields'));

    const user_id = uuidv4();

    bcrypt.hash(password, saltRounds, (err, hashedPass) => {
        if (err) return res.send(result.createResult('Error hashing password'));

        const sql = `INSERT INTO Users (user_id, email, password, role, is_deleted, created_at, updated_at) VALUES (?, ?, ?, ?, false, NOW(), NOW())`;
        pool.query(sql, [user_id, email, hashedPass, role], (err, data) => {
            if (err) return res.send(result.createResult(err));
            res.send(result.createResult(null, data));
        });
    });
});

// Login user
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM Users WHERE email = ? AND is_deleted = false`;
    pool.query(sql, [email], (err, data) => {
        if (err) return res.send(result.createResult(err));
        if (data.length === 0) return res.send(result.createResult('Invalid email'));

        bcrypt.compare(password, data[0].password, (err, passwordStatus) => {
            if (passwordStatus) {
                // const payload = {
                //     user_id: data[0].user_id,
                //     email: data[0].email,
                //     role: data[0].role
                // };
                const token = jwt.sign(payload, congig.SECRET, { expiresIn: '3d' });
                const user = {
                    token,
                    user_id: data[0].user_id,
                    email: data[0].email,
                    role: data[0].role,
                    profile_photo_url: data[0].profile_photo_url || null
                };
                res.send(result.createResult(null, user));
            } else {
                res.send(result.createResult('Invalid password'));
            }
        });
    });
});



// Get all users -- ADMIN
router.get('/', (req, res) => {
    pool.query(`SELECT user_id, email, role, profile_photo_url FROM Users WHERE is_deleted = false`, (err, data) => {
        res.send(result.createResult(err, data));
    });
});

// Upload profile photo
router.put('/avatar', upload.single('profile_photo'), (req, res) => {
    const { email } = req.body;
    if (!req.file) return res.send(result.createResult('No file uploaded'));
    if (!email) return res.send(result.createResult('Email is required'));

    const oldPath = req.file.path;
    const newPath = oldPath + '.jpg';

    fs.rename(oldPath, newPath, (err) => {
        if (err) return res.send(result.createResult('File rename error'));

        const photoURL = `/uploads/avatars/${req.file.filename}.jpg`;
        const sql = `UPDATE Users SET profile_photo_url = ?, updated_at = NOW() WHERE email = ?`;

        pool.query(sql, [photoURL, email], (err, data) => {
            if (err) return res.send(result.createResult(err));
            if (data.affectedRows === 0) {
                return res.send(result.createResult('User with this email not found'));
            }
            res.send(result.createResult(null, { email, profile_photo_url: photoURL }));
        });
    });
});

//Update User email

router.put('/update-email', (req, res) => {
    const { email, newEmail } = req.body;
    if (!email) return res.send(result.createResult('Current email is required'));
    if (!newEmail) return res.send(result.createResult('New email is required'));

    const sql = `SELECT * FROM Users WHERE email = ?`;
    const sqlUpdate = `UPDATE Users SET email = ?, updated_at = NOW() WHERE email = ?`;

    pool.query(sql, [email], (err, data) => {
        if (err) return res.send(result.createResult(err));
        if (data.length === 0) {
            return res.send(result.createResult('User not found'));
        }
        pool.query(sqlUpdate, [newEmail, email], (err, data) => {
            if (err) return res.send(result.createResult(err));
            res.send(result.createResult(null, 'Email updated successfully'));
        });
    });
});



//Update Password

router.put('/change-password', (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !oldPassword || !newPassword) return res.send(result.createResult('Please provide all fields'));

    const sqlSelect = `SELECT password FROM Users WHERE email = ?`;

    pool.query(sqlSelect, [email], (err, data) => {
        if (err) return res.send(result.createResult(err));
        if (data.length === 0) return res.send(result.createResult('User not found With Given Mail'));

        bcrypt.compare(oldPassword, data[0].password, (err, match) => {
            if (err) return res.send(result.createResult(err));
            if (!match) return res.send(result.createResult('Old password is incorrect'));

            bcrypt.hash(newPassword, saltRounds, (err, hashedPass) => {
                if (err) return res.send(result.createResult(err));

                const sqlUpdate = `UPDATE Users SET password = ?, updated_at = NOW() WHERE email = ?`;
                pool.query(sqlUpdate, [hashedPass, email], (err, data) => {
                    if (err) return res.send(result.createResult(err));
                    res.send(result.createResult(null, 'Password changed successfully'));
                });
            });
        });
    });
});

// Delete User

router.delete('/delete', (req, res) => {
    const { email } = req.body;
    if (!email) return res.send(result.createResult('Email is required'));

    const sql = `UPDATE Users SET is_deleted = true, updated_at = NOW() WHERE email = ?`;
    pool.query(sql, [email], (err, data) => {
        if (err) return res.send(result.createResult(err));
        if (data.affectedRows === 0) return res.send(result.createResult('User not found'));
        res.send(result.createResult(null, 'User deleted'));
    });
});


// Get user by name for -- ADMIN

router.get('/:email', (req, res) => {
    const email = req.params.email;

    const sql = `SELECT user_id, email, role, profile_photo_url, col1, col2, col3, col4 FROM Users WHERE email = ? AND is_deleted = false`;
    pool.query(sql, [email], (err, data) => {
        if (err) return res.send(result.createResult(err));
        if (data.length === 0) return res.send(result.createResult('User not found'));
        res.send(result.createResult(null, data[0]));
    });
});


module.exports = router;
