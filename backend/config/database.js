// Koneksi MySQL menggunakan mysql2 + dotenv

import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Cek koneksi
db.connect((err) => {
    if (err) {
        console.error('Gagal terhubung ke database:', err.message);
        return;
    }
    console.log('Database terhubung...');
});

export default db.promise();