
//Entry point of the application
const express = require('express');
const app = express();

//middleware           # Contains middleware functions
    //auth.js          # Authentication middleware

//views                # Contains EJS view templates
    //index.ejs        # Homepage template


 //controllers          # Contains controller files
    // index.js         # Index controller for handling routes
    //routes.js         # Route definitions for the application

//utils                # Utility functions
    //jwt.js            # JWT utility functions

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server started @ port${PORT}`)
})

