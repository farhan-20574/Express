const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

const 

app.use((req , res, next)=>{
    const msg= `Request Time: ${new Date.time()} ::: Method Request Path :${req.method} ${req.path}`;
    fs.appendFile ('acess_logs.txt', matchesGlob, (err)=>{
        if (err) throw err;
        console.log (' the "data to append" was appended to file!')
    })


const PORT= 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
