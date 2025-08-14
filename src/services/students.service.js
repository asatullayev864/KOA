import db from "../db/index.js";

class StudentService {
    async create(body) {
        const columns = Object.keys(body).join(', ');
        const rows = Object.values(body);
        const values = rows.map((_, i) => `$${i + 1}`); // $1 $2 $3
        const query = `insert into students (${columns}) values (${values}) returning *`;
        const result = await db.query(query, rows);
        return result.rows[0];
    }

    async findAll() {
        const result = await db.query('select * from students order by id asc');
        return result.rows;
    }

    async findById(id) {
        const result = await db.query(`select * from students where id = $1`, [id]);
        return result.rows[0];
    }

    async findOne(key, value) {
        const result = await db.query(`select * from students where ${key} = $1`, [value])
        return result.rows[0];
    }

    async update(id, body) {
        let query = 'update students set ';
        const keys = Object.keys(body);
        const rows = Object.values(body);
        for (let i = 0; i < keys.length; i++) {
            if (i == keys.length - 1) {
                query += `${keys[i]} = $${i + 1} `;
            } else {
                query += `${keys[i]} = $${i + 1} ,`;
            }
        }
        query += `where id = ${id} returning *`;
        const result = await db.query(query, rows);
        return result.rows[0];
    }

    async delete(id) {
        const result = await db.query(`delete from students where id = $1 returning *`, [id]);
        return result.rows[0];
    }
}

export default new StudentService();