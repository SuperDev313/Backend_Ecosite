const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/generateDiet', require('./routes/api/generateDiet'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
