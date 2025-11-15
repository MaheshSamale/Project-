const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const pool = require('../utils/db')
const result = require('../utils/results')

const salt = 10;

router.get('/',(req,res)=>{
    res.send(result.createResult(null,'hello'));
})

// Company Registeration 
router.post('/register',(req,res)=>{
    const {name , website , description , email , password }= req.body;
    console.log(req.body);
    bcrypt.hash(password,salt,(err,hashPass)=>{

        const organization_id = uuidv4();

        const sql = `INSERT INTO organizations (organization_id,name, website, description, email,password, is_deleted, created_at, updated_at) VALUES (?,?, ?, ?, ?, ? ,false, NOW(), NOW())`;
        pool.query(sql, [organization_id ,name, website, description , email ,hashPass], (err, data) => {
            if (err) return res.send(result.createResult(err));
            res.send(result.createResult(null, data));
        });
    });
});

// Company Login
router.post('/login',(req,res)=>{
    const {email, password} = req.body;

    const sql = `SELECT * FROM organizations WHERE email = ?`
    pool.query(sql,[email],(err,data)=>{
        if (err) return res.send(result.createResult(err));
        if(data.length == 0){
            res.send(result.createResult('Email not found'));
        }

        bcrypt.compare(password,data[0].password,(err, success) => {
            if (success) {
                const token = jwt.sign(payload, congig.SECRET, { expiresIn: '3d' });
                const org = {
                    token,
                    name : data[0].name,
                    organization_id : data[0].organization_id,
                    email: data[0].email,
                    description : data[0].description,
                    website : data[0].website,
                    profile_photo_url: data[0].profile_photo_url || null
                };
                res.send(result.createResult(null,org ));
            } else {
                res.send(result.createResult('Invalid password'));
            }
        });
    })

});

// Add Team in Organization 
router.post('/team',(req,res)=>{
    const {name, position, org_role} = req.body;
    const recruiter_id = uuidv4();
    const user_id = uuidv4();

    const userSql = ``


})

module.exports = router;