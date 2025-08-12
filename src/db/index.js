import { Pool } from "pg";

const db = new Pool({
    connectionString: 'postgres://postgres:1421@localhost5432/n23'
});

db.on('error', (err) => {
    console.log('Error on connecting to the database:', err);
    process.exit(1);
});

export default db;