const express = require('express')
require('dotenv').config()
const { syncDatabase } = require('./config/dataBase')
const route = require('./index')
const port = process.env.SERVER_PORT
const cors = require('cors')

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',route)


syncDatabase().then(() => {
    console.log('Database is ready!');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
});