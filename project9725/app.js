// Entry point of the application
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./src/controllers/routes');


//middleware           # Contains middleware functions
    //auth.js          # Authentication middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files


//views                # Contains EJS view templates
    //index.ejs        # Homepage template
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));



 //controllers          # Contains controller files
// index.js         # Index controller for handling routes
//routes.js         # Route definitions for the application
app.use('/', routes);

//utils                # Utility functions
    //jwt.js            # JWT utility functions

app.use(express.static(path.join(__dirname, 'public')));

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server started @ port${PORT}`)
})

