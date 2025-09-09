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
import "./utils/global.js";
import { config } from './config/index.js';

// const express = require('express');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Joi = require('joi');
// const multer = require('multer');


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
        await inputValidator(body_data, 'login')
        const user_data = users.find(data => data.email == body_data.userName)
        if (!user_data) throw new Error('UserName is not exist!');

        let token = jwt.sign(user_data, config.SECRET_KEY);
        user_data.token = token;
        return API_RESPONSE.apiSuccess(req, res, 'Log in Successfully.', user_data)
    } catch (error) {
        next(error);
    }
});

// GET /api/users
app.get('/api/users', authentication, async (req, res, next) => {
    try {
        // Candidate should implement user listing with auth check
        return API_RESPONSE.apiSuccess(req, res, 'User Data Found.', users, 200)
    } catch (error) {
        next(error);
    }
});

// POST /api/users
app.post('/api/users', authentication, authorization, async (req, res) => {
    // Candidate should implement user creation with validation
    const body_data = req.body;
    await inputValidator(body_data, 'add')
    const user_data = users.find(data => data.email == body_data.email)
    if (user_data) throw new Error('Email is already Exist!!');
    const ids_arr = users.map(user => user.id);
    let highest_value = Math.max(...ids_arr)
    highest_value += 1;
    const add_data = {
        id: highest_value,
        name: body_data.name,
        email: body_data.email,
        role: body_data.role,
    }
    users.push(add_data);
    return API_RESPONSE.apiSuccess(req, res, 'User Added Successfully.', users, 201)
});

// PUT /api/users/:id
app.put('/api/users/:id', authentication, authorization, async (req, res, next) => {
    try {
        const body_data = req.body;
        const params = req.params;

        const user_data = users.find(data => data.id == params.id);
        if (!user_data) throw new Error('User is not Exist!!');

        await inputValidator(body_data, 'update');
        user_data.name = body_data.name;
        user_data.email = body_data.email;
        user_data.role = body_data.role;

        const updatedUsers = users.map(user =>
            user.id === user_data.id ? user_data : user
        );
        return API_RESPONSE.apiSuccess(req, res, 'User Updated Successfully.', updatedUsers, 201)
    } catch (error) {
        next(error)
    }

});

// DELETE /api/users/:id
app.delete('/api/users/:id', authentication, authorization, async (req, res, next) => {
    // Candidate should implement user deletion
    try {
        const params = req.params;
        const user_data = users.find(data => data.id == params.id);
        if (!user_data) throw new Error('User is not Exist!!');

        const updatedUsers = users.filter(user => user.id !== user_data.id);
        return API_RESPONSE.apiSuccess(req, res, 'User Deleted Successfully.', updatedUsers, 201)
    } catch (error) {
        next(error);
    }
});
app.use(errorHandler);

app.listen(3001, () => {
    console.log('Server running on port 3001');
});

const schemaObj = {
    login: {
        userName: Joi.string().required(),
        password: Joi.string().required(),
    },
    add: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        role: Joi.string().required(),
    },
    update: {
        name: Joi.string().optional(),
        email: Joi.string().optional(),
        role: Joi.string().optional(),
    },
    delete: {
        id: Joi.number().required(),
    }
}

const inputValidator = async (data, key) => {
    const isValidate = Joi.object(schemaObj[key]).validate(data);
    if (isValidate.error) {
        throw new Error(isValidate.error.message);
    }
}