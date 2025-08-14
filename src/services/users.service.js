import db from "../db/index.js";

class UserServices {
    async create(body) {
        const columns = Object.keys(body).join(', ');
        const rows = Object.values(body);
        const values = rows.map((_, i) => `$${i + 1}`);
        const query = `INSERT INTO users (${columns}) VALUES (${values}) RETURNING *`;
        const result = await db.query(query, rows);
        return result.rows[0];
    }

    async findAll() {
        const result = await db.query(`SELECT * FROM users ORDER BY ID ASC`);
        return result.rows;
    }

    async findById(id) {
        const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return result.rows[0];
    }

    async findOne(key, values) {
        const result = await db.query(`SELECT * FROM users WHERE ${key} = ${values}`);
        return result.rows[0];
    }

    async update(id, body) {
        let query = '';
        const keys = Object.keys(body);
        for (let i = 0; i < keys; i++) {
            if (i == keys.length - 1) {
                query += `${keys[i]} = $${i + 1} `
            } else {
                query += `${keys[i]} = $${i + 1}, `
            }
        }
        query += `WHERE id = ${id} RETURNING *`;
        const result = await db.query(query, rows);
        return result.rows[0];
    }

    async delete(id) {
        const result = await db.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
        return result.rows[0];
    }
}

export default new UserServices();
