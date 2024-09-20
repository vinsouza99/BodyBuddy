import axios from "axios";

const URL = 'http://localhost:8080'; //the URL to the backend
/**
 * This class acts as a proxy between the frontend and the backend
 * The methods are static, so there is no need to create an object of this class (see Dashboard.jsx for reference)
 */
class API{
    /**
     * a method that tries to get a resource from the backend
     * @param {*} path - the endpoint where the resource is located
     * @param {*} options - additional information to complete the request (still not used)
     * @returns Promise
     */
    static async get(path, options){
        return await axios.get(`${URL}${path}`);
    }
}
export default API;