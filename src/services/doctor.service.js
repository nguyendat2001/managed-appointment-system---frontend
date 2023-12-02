import createApiClient from "./api.service";



class DoctorService {
    constructor(baseUrl = "http://127.0.0.1:9004/api/doctors") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get('/', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async getAllActive() {
        return (await this.api.get('/findallactive', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async create(data) {
        return (await this.api.post('/', data, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async sendmail(data) {
        return (await this.api.post('/mailtodoctor', data, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async deleteAll() {
        return (await this.api.delete('/', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async getByDepartmentandisactive(id) {
        return (await this.api.get(`/findbyDepartmentandisactive/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async getByDepartmentAndIsActive(id) {
        return (await this.api.get(`/findbyDepartmentandisactive/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async active(id) {
        return (await this.api.get(`/active/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async inactive(id) {
        return (await this.api.get(`/inactive/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async getByDepartment(id) {
        return (await this.api.get(`/by-Department/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async getByAccount(id) {
        return (await this.api.get(`/by-Account/${id}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })).data;
    }

    async uploadAvatar(id, data) {
        return (await this.api.post(`/upload-avatar/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                'Content-Type': 'multipart/form-data',
                Accept: "application/json",
            }
        })).data;
    }

    async updateAvatar(id, data) {
        return (await this.api.put(`/update-avatar/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                'Content-Type': 'multipart/form-data',
                Accept: "application/json",
            }
        })).data;
    }

}

export default new DoctorService();