import createApiClient from "./api.service";

const user = JSON.parse(localStorage.getItem('user'));

const commonConfig = {
    headers: {
        'Authorization': `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

class DatasetService {
    constructor(baseUrl = "http://127.0.0.1:9004/api/wards") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get('/', )).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async getAllByDistrict(id) {
        return (await this.api.get(`/getAllByDistrict/${id}`)).data;
    }

    async getAllActiveWard() {
        return (await this.api.get('/getAllActiveWard', )).data;
    }

    async inactive(id) {
        return (await this.api.get(`/inactive/${id}`, commonConfig)).data;
    }

    async active(id) {
        return (await this.api.get(`/active/${id}`, commonConfig)).data;
    }

    async create(data) {
        return (await this.api.post('/', data, commonConfig)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data, commonConfig)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`, commonConfig)).data;
    }

}

export default new DatasetService();