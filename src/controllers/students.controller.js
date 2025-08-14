import studentModel from '../services/students.service.js';

class StudentController {
    async create(ctx) {
        const existsEmail = await studentModel.findOne('email', ctx.request.body.email);
        if (existsEmail) {
            ctx.throw(409, '** Conflict error ** email adress already exists.')
        }
        const newUser = await studentModel.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = newUser;
    }

    async findAll(ctx) {
        const student = await studentModel.findAll();
        ctx.status = 200;
        ctx.body = student;
    }

    async findById(ctx) {
        const id = ctx.params?.id;
        const student = await studentModel.findById(id);
        if (!student) {
            ctx.throw(404, 'Student not found');
        }
        ctx.status = 200;
        ctx.body = student;
    }

    async update(ctx) {
        const id = ctx.params?.id;
        const student = await studentModel.update(id, ctx.request.body);
        if (!student) {
            ctx.throw(404, 'Student not found')
        }
        ctx.status = 200;
        ctx.body = student;
    }

    async delete(ctx) {
        const student = await studentModel.delete(ctx.params?.id);
        if (!student) {
            ctx.throw(404, 'Student not found');
        }
        ctx.status = 200;
        ctx.body = {};
    }
}

export default new StudentController();