const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./models/db');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes
const routes = require('./routes');
app.use('/', routes);

// Database synchronization
sequelize.sync().then(() => {
  console.log('Database synced');
});

// Add Array of Objects (Products)
const products = [
  {
    name: 'Blue Jeans',
    price: 7500,
    type: 'clothing',
    image: 'https://believeintherun.com/wp-content/uploads/2023/03/nike-vaporfly-next-3-feature.jpg',
    slug: 'blue-jeans'
  },
  {
    name: 'VaporFly NEXT%',
    price: 75000,
    type: 'shoes',
    image: 'https://believeintherun.com/wp-content/uploads/2023/03/nike-vaporfly-next-3-feature.jpg',
    slug: 'vaporfly-next%'
  },
  {
    name: 'Casual Kurta',
    type: 'clothing',
    image: 'https://believeintherun.com/wp-content/uploads/2023/03/nike-vaporfly-next-3-feature.jpg'
  }
];

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});