const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

const courses = ['PSDC', 'Shopify', 'Meta'];

const products = [
  { name: 'Blue Jeans', 
    price: 7500,
    type: 'clothing',
    image:'https://imgs.search.brave.com/OZrFrzZbn1fSGvVRrYms9xjZ66MBVzCRhH6LdhduqBI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvNjI1/NDcxMS9zdG9jay1w/aG90by1ibHVlLWpl/YW5z'},
  { 
    name: 'VaporFly NEXT%', 
    price: 75000,
    type: 'shoes', 
    image: 'https://believeintherun.com/wp-content/uploads/2023/03/nike-vaporfly-next-3-feature.jpg' 
  },
  { 
    name: 'Casual Kurta', 
    type: 'clothing', 
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