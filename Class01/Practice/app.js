const express = require('express');
const http = require('http')
const app = express();






const PORT = 3000;
app.listen(PORT,()=>{
    console.log (`Server started on port ${PORT}`)
})
