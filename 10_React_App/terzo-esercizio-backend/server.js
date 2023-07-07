const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(cors());

const SECRET_KEY = 'mysecretkey';

let users = []; // database simulato in memoria

app.post('/api/register', async (req, res) => {
    const { username, password, name,skills,contacts } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
        username,
        password: hashedPassword,
        name,
        skills,
        contacts,
    });
    res.status(201).json({ message: 'User registered' });
});

app.post('/api/authenticate', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ name: user.name, username:user.username }, SECRET_KEY, {
        expiresIn: "1h",
    });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.post('/api/updateProfile', async (req, res) => {
    const token = req.headers['authorization'];
    const { name } = req.body;
    debugger;
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = users.find(user => user.name === decoded.name);
        if (user) {
            user.name = name;
            debugger;
            res.json({ message: 'Profile updated' });
        } else {

            debugger;
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

app.post('/api/updateDeatails',  (req, res) => {
    const token = req.headers['authorization'];
    const { biography,projects,skills,contacts } = req.body;
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = users.find(user => user.usernamename === decoded.usernamename);
        if (user) {
            user.biography = biography;
            user.projects=projects;
            user.skills=skills;
            user.contacts=contacts;
            res.json({ message: 'Profile deatails updated' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });11
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});