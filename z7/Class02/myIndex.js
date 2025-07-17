const express = require('express');
const fs = require('express');
app = express();
PORT = 3000;

//Middleware
app.use('./',()=>{
    console.log('>>>>>>Middleware accessed<<<<')
});

//Routes
app.get('./', (res,req)=>{
    res.send('')
})


app.listen(PORT, (res, req) => {
    console.log(`server started @ ${PORT}`);
});
