const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 8080;

app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Crear tabla products si no existe
pool.query(`
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    stock INT NOT NULL
  )
`);

// Insertar productos iniciales si la tabla está vacía
pool.query('SELECT COUNT(*) FROM products').then(result => {
    if (parseInt(result.rows[0].count) === 0) {
        const initialProducts = [
            { name: 'Laptop Pro', price: 1200, stock: 5 },
            { name: 'Mouse Inalámbrico', price: 25, stock: 50 },
            { name: 'Teclado Mecánico', price: 80, stock: 15 }
        ];
        initialProducts.forEach(async (p) => {
            await pool.query(
                'INSERT INTO products (name, price, stock) VALUES ($1, $2, $3)',
                [p.name, p.price, p.stock]
            );
        });
        console.log('Initial products inserted');
    }
});

app.get('/api/v1/products', async (req, res) => {
    const result = await pool.query('SELECT * FROM products');
    res.json({ products: result.rows });
});

app.get('/api/v1/products/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID. It must be a number." });
    }

    const result = await pool.query('SELECT * FROM products WHERE id=$1', [id]);

    if (result.rows.length > 0) res.json(result.rows[0]);
    else res.status(404).json({ error: 'Product not found' });
});


app.get('/api/v1/products/view', async (req, res) => {
    const result = await pool.query('SELECT * FROM products');
    let html = `
        <h1>Lista de Productos</h1>
        <table border="1" cellpadding="10">
        <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr>
    `;

    result.rows.forEach(p => {
        html += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.stock}</td>
            </tr>
        `;
    });

    html += `</table>`;
    res.send(html);
});


app.post('/api/v1/products', async (req, res) => {
    const { name, price, stock } = req.body;
    if (!name || !price || stock === undefined) {
        return res.status(400).json({ error: 'Missing data' });
    }
    const result = await pool.query(
        'INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *',
        [name, price, stock]
    );
    res.status(201).json({ message: 'Product created', product: result.rows[0] });
});



app.listen(port, () => console.log(`Product Service running at http://localhost:${port}`));
