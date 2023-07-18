/**
 * @module          ApplicationServerServiceFactory
 */
import ApplicationExceptionUnsupported from "../../exception/Unsupported.js";

/**
 * @class
 * 
 * Factory for creating application services
 */
export default class ApplicationServerServiceFactory {
    static #services = new Map();

    /**
     * Register the class to use the application service
     * 
     * @param {Type} c      Application server servie class
     */
    static use(c) {
        ApplicationServerServiceFactory.#services.set(c.name, c);
    }

    /**
     * Generate application service
     * 
     * @param {String} name                 Service name
     * @param {ApplicationServer} server    Application server object
     * @param {Object} config               config
     * @return ApplicationServerService     Generated application server service object
     */
    static gen(name, server, config) {
        const Service = ApplicationServerServiceFactory.#services.get(name);

        if(Service) {
            return new Service(server, config);
        }

        throw new ApplicationExceptionUnsupported();
    }
}