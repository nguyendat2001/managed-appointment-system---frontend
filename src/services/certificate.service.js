import createApiClient from "./api.service";

const user = JSON.parse(localStorage.getItem('user'));

const commonConfig = {
    headers: {
        'Authorization': `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

class AppointmentService {
    constructor(baseUrl = "http://127.0.0.1:9004/api/certificates") {
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

    async getAllByDoctor(id) {
        return (await this.api.get(`/findallbydoctor/${id}`, commonConfig)).data;
    }

    async getAllByWard(id) {
        return (await this.api.get(`/findallbyward/${id}`, commonConfig)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data, commonConfig)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`, commonConfig)).data;
    }

    async uploadfile(id, data) {
        return (await this.api.post(`/upload_file/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`,
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
        })).data;
    }

    async updatefile(id, data) {
        return (await this.api.post(`/update_file/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`,
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
        })).data;
    }
}

export default new AppointmentService();