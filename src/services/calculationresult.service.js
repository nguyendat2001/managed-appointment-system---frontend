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
    constructor(baseUrl = "http://127.0.0.1:9004/api/caculationresults") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get('/', commonConfig)).data;
    }

    async create(data) {
        return (await this.api.post('/', data, commonConfig)).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`, commonConfig)).data;
    }

    async getallbymodel(id) {
        return (await this.api.get(`/getallbymodel/${id}`, commonConfig)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data, commonConfig)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`, commonConfig)).data;
    }

}

export default new DatasetService();