import createApiClient from "./api.service";

const commonConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
        Accept: "application/json",
    },
};

class DatasetService {
    constructor(baseUrl = "http://127.0.0.1:5000") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        return (await this.api.post('/file-upload', data, commonConfig)).data;
    }

    async delete(filename) {
        return (await this.api.get(`/file-delete/${filename}`)).data;
    }

}

export default new DatasetService();