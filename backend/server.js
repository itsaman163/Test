// BACKEND STARTER CODE (server.js)
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import multer from 'multer';
import errorHandler from './middlewares/errorHandler.js';
import authentication from './middlewares/authontication.js';
import authorization from './middlewares/authorization.js';
// const express = require('express');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Joi = require('joi');
// const multer = require('multer');
// require('dotenv');

const app = express();
const form = multer();
app.use(cors());
app.use(express.json());
app.use(form.any());
// In-memory database (for simplicity)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
];

let nextId = 3;

// TODO: Implement these endpoints
// POST /api/login
app.post('/api/login', async (req, res, next) => {
    try {
        // Candidate should implement authentication logic
        const body_data = req.body;
        // console.log(body_data, 'login');
        await inputValidator(body_data, 'login')

        const user_data = users.find(data => data.email == body_data.userName)
        if (!user_data) throw new Error('UserName is not exist!');

        let token = jwt.sign(user_data, 'PMS@)@#');
        user_data.token = token;
        res.status(200).json({
            settings: {
                success: 1,
                message: 'login successfully.'
            },
            data: user_data
        })

    } catch (error) {
        next(error);
    }
});

// GET /api/users
app.get('/api/users', authentication, authorization, async (req, res, next) => {
    try {
        // Candidate should implement user listing with auth check
        res.status(200).json({
            settings: {
                success: 1,
                message: 'User Data Found.'
            },
            data: users
        })

    } catch (error) {
        next(error);
    }
});

// POST /api/users
app.post('/api/users', (req, res) => {
    // Candidate should implement user creation with validation
});

// PUT /api/users/:id
app.put('/api/users/:id', (req, res) => {
    // Candidate should implement user update
});

// DELETE /api/users/:id
app.delete('/api/users/:id', (req, res) => {
    // Candidate should implement user deletion
});
app.use(errorHandler);

app.listen(3001, () => {
    console.log('Server running on port 3001');
});

const schemaObj = {
    login: {
        userName: Joi.string().required(),
        password: Joi.string().required(),
    }
}

const inputValidator = async (data, key) => {
    const isValidate = Joi.object(schemaObj[key]).validate(data);
    if (isValidate.error) {
        throw new Error(isValidate.error.message);
    }
}