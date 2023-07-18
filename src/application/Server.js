/**
 * @module      ApplicationServer
 */
import ApplicationExceptionUnsupported from "./exception/Unsupported.js";

/**
 * @class
 * 
 * Application server abstract class
 */
export default class ApplicationServer {
    #services = new Map();

    #config = null;

    /**
     * ApplicationServer's constructor
     * 
     * @param {Object} config       config
     */
    constructor(config) {
        this.#config = config;
    }

    /**
     * service on
     */
    async on() {
    }

    /**
     * service off
     */
    async off() {
        this.#services.forEach(service => service.off());
    }

    /**
     * register server's service
     * 
     * @param {ApplicationServerService} service 
     */
    reg(service) {
        this.#services.set(service.path, service);
    }

    /**
     * Execute service's module method
     * 
     * @param {String} path     service name
     * @param {String} name     module name
     * @param {String} method   module's method name
     * @param  {...any} args    arguments
     * @returns Object          result
     */
    async moduleCall(path, name, method, ...args) {
        const service = this.#services.get(path);
        if(service) {
            const module = service.modules.get(name);
            if(module) {
                return module.call(method, ...args);
            }
        }
        throw new ApplicationExceptionUnsupported();
    }

    /**
     * Execute service method
     * 
     * @param {String} path     service name
     * @param {String} method   method name
     * @param  {...any} args    arguments
     * @returns Object          result
     */
    async call(path, method, ...args) {
        const service = this.#services.get(path);
        if(service) {
            return await service.call(method, ...args);
        }

        throw new ApplicationExceptionUnsupported();
    }
}