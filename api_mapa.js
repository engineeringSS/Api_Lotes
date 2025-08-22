// Importamos las librerías necesarias
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// Creamos la aplicación del servidor
const app = express();
const port = 8765; // El puerto donde escuchará nuestra API

// Habilitamos CORS para que cualquier web pueda consumir esta API
app.use(cors());

// Configuración de la conexión a tu base de datos PostgreSQL
// ¡¡IMPORTANTE: Usa la contraseña NUEVA y SEGURA que creaste!!
const pool = new Pool({
  user: 'admin_cc',
  host: 'localhost', // Usamos localhost porque la API correrá en el mismo servidor que la DB
  database: 'cruz_corcovada_db',
  password: 'Panasonic2025+',
  port: 5432,
});

// Definimos la ruta principal de la API: /lotes
app.get('/lotes', async (req, res) => {
  try {
    const query = `
      SELECT 
          id,
          manzana,
          numero_lote,
          estado,
          coordenadas_geojson,
          area_m2,                 -- <--- LÍNEA AÑADIDA
          precio_lista_usd         -- <--- LÍNEA AÑADIDA
      FROM 
          lotes 
      WHERE 
          proyecto_id = 1 
          AND coordenadas_geojson IS NOT NULL;
    `;
    const result = await pool.query(query);
    res.json(result.rows); // Enviamos los resultados como JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al consultar la base de datos');
  }
});

// Iniciamos el servidor para que empiece a escuchar peticiones
app.listen(port, () => {
  console.log(`Servidor de API para mapa corriendo en http://localhost:${port}`);
});