const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
});

module.exports = Student;