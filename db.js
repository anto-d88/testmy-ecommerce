const mysql = require('mysql2');

/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Toni-deb2012',
  database: 'ecommerce'
});*/
const connection = mysql.createConnection({
  host: '',
  user: 'spiruline',
  password: 'Toni-deb2012',
  database: 'spiruline_my-ecommerce'
});

module.exports = connection;
