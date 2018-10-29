// ===============================
// Puerto
// ===============================
process.env.PORT = process.env.PORT || 3000;

// ===============================
// Entorno
// ===============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===============================
// Base de datos
// ===============================
let urlDB;
//if (process.env.NODE_ENV === 'dev') {
//    urlDB = 'mongodb://localhost:27017/cafe';
//} else {
urlDB = 'mongodb://cafe-user:cafe123456@ds143893.mlab.com:43893/cafe';
//}

process.env.URLDB = urlDB;

/*
mongodb://localhost:27017/cafe
mongodb://<dbuser>:<dbpassword>@ds143893.mlab.com:43893/cafe 
usuario: JMLcurso-node
password: JML@setenipse2018
*/