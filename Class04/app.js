const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

const courses = ['PSDC', 'Shopify', 'Meta'];

const products = [
  { name: 'Blue Jeans', type: 'clothing' },
  { 
    name: 'VaporFly NEXT%', 
    type: 'shoes', 
    image: 'https://believeintherun.com/wp-content/uploads/2023/03/nike-vaporfly-next-3-feature.jpg' 
  }
];

// Define a route to render the index view
app.get('/', (req, res) => {
  res.render('index', {
    user: { name: 'Farhan' },
    courses
  });
});

// Create a Product page
app.get('/products', (req, res) => {
  res.render('products', {
    products
  });
});

// Create an Individual Product page
app.get('/vaporfly', (req, res) => {
  res.render('vaporfly', {
    product: products[1]
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});