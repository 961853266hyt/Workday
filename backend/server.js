const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./database');
const port = 8000;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});