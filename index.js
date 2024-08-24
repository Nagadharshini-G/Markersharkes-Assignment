import express from 'express';
import bodyParser from 'body-parser';
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();
app.use(bodyParser.json());

const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

app.post('/api/supplier/query', async (req, res) => {
  const { location, nature_of_business, manufacturing_processes } = req.body;

  try {
    const query = ` SELECT supplier_id, company_name, website, location, nature_of_business, manufacturing_processes
      FROM suppliers
      WHERE location = $1
        AND nature_of_business = $2
        AND manufacturing_processes @> ARRAY[$3]::varchar[]
      LIMIT 10;`;
    const result = await pool.query(query, [location, nature_of_business, manufacturing_processes]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'No company register with this specific name and circumference' });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error('Error occurred in the query', err.stack);
    res.status(500).json({ error: 'Error is occurred.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});