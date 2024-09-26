import axios from "axios";

const URL = "http://localhost:8080/api/"; //the URL to the backend (refer to server/server.js line 7)
/**
 * This class acts as a proxy between the frontend and the backend
 * The methods are static, so there is no need to create an object
 * of this class
 */
class ProxyServer {
  /**
   * a method that tries to get all resources from one database table
   * @param {string} path - the table where the resources are located
   * @returns A response object
   */
  static async getAll(path) {
    console.log(`Getting everything from /${path}...`);
    const response = await axios.get(`${URL}${path}`);
    return response.data;
  }
  /**
   * A method that tries to get an object from the database
   * @param {string} path - the table where the resource is located
   * @param {string} id - the ID of the resource you want to get
   * @returns Promise
   */
  static async get(path, id) {
    console.log(`Getting from ${path}/${id}...`);
    const response = await axios.get(`${URL}${path}/${id}`);
    return response.data;
  }
  /**
   * a method that tries to get all resources from one database table
   * @param {string} path - the table where the resources are located
   * @param {Object} obj - the object that represents the entity to be added
   * @returns A response object
   */
  static async add(path, obj) {
    console.log(`Adding to /${path}...`);
    const response = await axios.post(`${URL}${path}`, obj);
    return response.data;
  }
  /**
   * A method that tries to update an object of the database
   * @param {string} path - the table where the resource is located
   * @param {string} id - the ID of the resource you want to update
   * @param {Object} newObj - an object that contains the updated info
   * @returns Promise
   */
  static async update(path, id, newObj) {
    console.log(`Updating /${path}/${id}...`);
    const response = await axios.put(`${URL}${path}/${id}`, newObj);
    return response.data;
  }
  /**
   * A method that tries to delete an object from the database
   * @param {string} path - the table where the resource is located
   * @param {string} id - the ID of the resource you want to delete
   * @returns Promise
   */
  static async delete(path, id) {
    console.log(`Deleting from /${path}/${id}...`);
    const response = await axios.delete(`${URL}${path}/${id}`);
    return response.data;
  }
}
export default ProxyServer;
