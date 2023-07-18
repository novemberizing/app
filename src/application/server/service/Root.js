/**
 * @module      ApplicationServerServiceRoot
 */
import ApplicationServerService from "../Service.js";

/**
 * @class
 * 
 * Root service
 */
export default class ApplicationServerServiceRoot extends ApplicationServerService {
    /**
     * Root service's constructor
     * 
     * @param {ApplicationServer} server    Application server object
     * @param {Object} config               Config
     */
    constructor(server, config) {
        super("", server, config);

        if(server.express) {
            server.express.get(`${this.path}/`, async (req, res) => res.send(await this.root()));
        }
    }

    /**
     * Root service's root method
     * 
     * @returns     Object      result
     */
    async root(){
        return {};
    }
}