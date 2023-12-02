import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "http://127.0.0.1:9004/api/auth") {
        this.api = createApiClient(baseUrl);
    }

    async signin(data) {
        return (await this.api.post('/signin', data)).data;
    }

    async signup(data) {
        return (await this.api.post('/signup', data)).data;
    }

    async refreshtoken(id) {
        return (await this.api.post(`/refreshtoken`, data)).data;
    }

    async signout(id) {
        return (await this.api.get(`/signout/${id}`)).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async getByUsername(data) {
        return (await this.api.post('/findByUserName', data)).data;
    }
}

export default new UserService();