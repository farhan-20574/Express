const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/students', studentRoutes());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});