import universityModel from '../services/univirsity.service.js';

class UniversityController {
    async create(ctx) {
        const existsName = await universityModel.findOne('name', ctx.request.body.name);
        if (existsName) {
            ctx.throw(409, 'University name already exists');
        }
        const newUniversity = await universityModel.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = newUniversity;
    }

    async getAll(ctx) {
        const universities = await universityModel.findAll();
        ctx.status = 200;
        ctx.body = universities;
    }

    async getById(ctx) {
        const university = await universityModel.findById(ctx.params?.id);
        if (!university) {
            ctx.throw(404, 'University not found');
        }
        ctx.status = 200;
        ctx.body = university;
    }

    async update(ctx) {
        const university = await universityModel.update(ctx.params?.id, ctx.request.body);
        if (!university) {
            ctx.throw(404, 'University not found');
        }
        ctx.status = 200;
        ctx.body = university;
    }

    async delete(ctx) {
        const university = await universityModel.delete(ctx.params?.id);
        if (!university) {
            ctx.throw(404, 'University not found');
        }
        ctx.status = 200;
        ctx.body = {};
    }
}

export default new UniversityController();