const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Conexión a la base de datos de XAMPP
const db = mysql.createConnection({
    host: "localhost",
    user: "root",       // usuario predeterminado de XAMPP
    password: "",       // sin contraseña por defecto en XAMPP
    database: "registro_usuarios",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Conectado a la base de datos MySQL.");
});

// Ruta para registrar usuario
app.post("/register", async (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const query = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)";
    db.query(query, [nombre, correo, hashedPassword], (err) => {
        if (err) throw err;
        res.send("Usuario registrado exitosamente.");
    });
});

app.use(express.static("public")); // Sirve el frontend
app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
