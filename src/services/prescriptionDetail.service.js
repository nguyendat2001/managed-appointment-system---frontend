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
    constructor(baseUrl = "http://127.0.0.1:9004/api/prescriptiondetail") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get('/', )).data;
    }

    async create(data) {
        return (await this.api.post('/', data, commonConfig)).data;
    }

    async deleteAll() {
        return (await this.api.delete('/', commonConfig)).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`, )).data;
    }

    async getByPrescription(id) {
        return (await this.api.get(`/getbyprescription/${id}`, )).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data, commonConfig)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`, commonConfig)).data;
    }

    async deleteByPrescription(id) {
        return (await this.api.delete(`/deletebyprescription/${id}`, commonConfig)).data;
    }

}

export default new PrescriptionService();