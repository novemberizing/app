/**
 * @module      ApplicationServerFactory
 */
import ApplicationExceptionUnsupported from "../exception/Unsupported.js";

/**
 * @class
 * 
 * A factory to create application servers
 */
export default class ApplicationServerFactory {
    static #servers = new Map();

    /**
     * Register class to use application server class in the application.
     * 
     * @param {ApplicationServer} c     Application server class
     */
    static use(c) {
        ApplicationServerFactory.#servers.set(c.name, c);
    }

    /**
     * Create an application server
     * 
     * @param {Object} config   Settings to create an application server
     * @returns ApplicationServer generated application server
     */
    static async gen(config) {
        const Server = ApplicationServerFactory.#servers.get(config.engine);

        if(Server) {
            delete config.engine;

            return new Server(config);
        }

        throw new ApplicationExceptionUnsupported();
    }
}