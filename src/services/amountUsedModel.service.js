import createApiClient from "./api.service";

class AppointmentService {
    constructor(baseUrl = "http://127.0.0.1:9004/api/amountusedmodels") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get('/')).data;
    }

    async create(data) {
        return (await this.api.post('/', data)).data;
    }

    async getByYearMonthAndModel(data) {
        return (await this.api.post('/by-YearMonthAndModel/', data)).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async getByModel(id) {
        return (await this.api.get(`/by-model/${id}`)).data;
    }

    async getByYearMonth(id) {
        return (await this.api.get(`/by-YearMonth/${id}`, )).data;
    }

}

export default new AppointmentService();