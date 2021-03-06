// ===============================
// Puerto
// ===============================
process.env.PORT = process.env.PORT || 3000;

// ===============================
// Entorno
// ===============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===============================
// Vencimiento del token
// ===============================
// 60 segundo
// 60 minutos
// 23 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ===============================
// Semilla del token
// ===============================
process.env.SEMILLA_TOKEN = process.env.SEMILLA_TOKEN || 'este-es-el-sheed-desarrollo';
process.env.SEED = process.env.SEED || 'este-es-el-sheed-desarrollo';


// ===============================
// Base de datos
// ===============================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
