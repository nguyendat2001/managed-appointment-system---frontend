import createApiClient from "./api.service";

const user = JSON.parse(localStorage.getItem('user'));

const commonConfig = {
    headers: {
        'Authorization': `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

class PrescriptionService {
    constructor(baseUrl = "http://127.0.0.1:9004/api/prescriptions") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get('/', commonConfig)).data;
    }

    async create(data) {
        return (await this.api.post('/', data, commonConfig)).data;
    }

    async deleteAll() {
        return (await this.api.delete('/', commonConfig)).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`, commonConfig)).data;
    }

    async getByDoctorAndActive(id) {
        return (await this.api.get(`/getByDoctorAndActive/${id}`, commonConfig)).data;
    }

    async getByUserAndActive(id) {
        return (await this.api.get(`/getByUserAndActive/${id}`, commonConfig)).data;
    }

    async getAllActive() {
        return (await this.api.get('/getallactive', commonConfig)).data;
    }

    async active(id) {
        return (await this.api.get(`/active/${id}`, commonConfig)).data;
    }

    async inactive(id) {
        return (await this.api.get(`/inactive/${id}`, commonConfig)).data;
    }

    async getByUser(id) {
        return (await this.api.get(`/by-userId/${id}`, commonConfig)).data;
    }

    async getByDoctor(id) {
        return (await this.api.get(`/by-doctorId/${id}`, commonConfig)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data, commonConfig)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`, commonConfig)).data;
    }

}

export default new PrescriptionService();