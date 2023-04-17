/**
 * Core APi abilities
 * */
import axios from "axios";

export default class ApiCoreService {

    static async graphCall(name, query, params) {
        // todo if status 401 , take to login
        try {
            let result = await this.post('/api/graph-api', {query, variables: params});
            // check result fine.
            result = result.data;
            console.log(result);
            if (result.errors) {
                const newError = new Error();
                newError.source = name;
                newError.details = result.errors;
                newError.message = result.errors.map(error => error.message);
                throw newError;
            }
            const xpath = name.split('.');
            let filtered = result.data;
            xpath.forEach(key => filtered = filtered[key]);
            return filtered;
        } catch (c) {
            if (c.details) throw c;
            const newError = new Error(c);
            newError.source = name;
            newError.details = c;
            newError.message = 'Error running graph api for ' + name + '. ' + c.message;
            throw newError;
        }
    }

    static async post(url, body) {
        return axios.post(url, body);
    }
}
