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
    constructor(baseUrl = "http://127.0.0.1:9004/api/worktimes") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get('/', )).data;
    }

    async getAllAvailableWorktime() {
        return (await this.api.get('/getAllAvailableWorktime', )).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async getAllByDoctor(id) {
        return (await this.api.get(`/getAllByDoctor/${id}`)).data;
    }

    async getAllByWorkdate(id) {
        return (await this.api.get(`/getAllByWorkdate/${id}`)).data;
    }

    async getAllByWorkdateAndIsAvailable(id) {
        return (await this.api.get(`/getAllByWorkdateAndIsAvailable/${id}`)).data;
    }

    // async create(data) {
    //     return (await this.api.post('/', data, commonConfig)).data;
    // }

    // async update(id, data) {
    //     return (await this.api.put(`/${id}`, data, commonConfig)).data;
    // }

    // async delete(id) {
    //     return (await this.api.delete(`/${id}`, commonConfig)).data;
    // }

}

export default new DatasetService();