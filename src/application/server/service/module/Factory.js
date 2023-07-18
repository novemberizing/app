/**
 * @module      ApplicationServerServiceModuleFactory
 */
import ApplicationExceptionUnsupported from "../../../exception/Unsupported.js";

/**
 * @class
 * 
 * Factory for creating modules
 */
export default class ApplicationServerServiceModuleFactory {
    static #modules = new Map();

    /**
     * Register to use the module
     * 
     * @param {ApplicationServerServiceModule} c        Application module class
     */
    static use(c) {
        ApplicationServerServiceModuleFactory.#modules.set(c.name, c);
    }

    /**
     * Generate module
     * 
     * @param {String} name                             module name
     * @param {ApplicationServerService} service        Application server service object
     * @param {Object} config                           config
     * @returns ApplicationServerServiceModule          generated module object
     */
    static gen(name, service, config) {
        const Module = ApplicationServerServiceModuleFactory.#modules.get(name);

        if(Module) {
            return new Module(service, config);
        }

        throw new ApplicationExceptionUnsupported();
    }
}
