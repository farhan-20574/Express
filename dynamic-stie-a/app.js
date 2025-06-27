const express = require('express');
const fs = require('fs');
const ejs = require('ejs')
const app = express();

//Set EJS as View Engine
app.set('viewengine','ejs');

//Start the Server
const PORT= 3000;
app.listen(PORT,()=>{
    console.log(`Server started at Localhost:${PORT}`);
});

