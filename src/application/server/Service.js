/**
 * @module      ApplicationServerService
 */
import ApplicationExceptionUnsupported from "../exception/Unsupported.js";

import ApplicationServerServiceModuleFactory from "./service/module/Factory.js";

/**
 * @class
 * 
 * Application server service
 */
export default class ApplicationServerService {
    #path = null;
    #server = null;
    #config = null;
    #modules = new Map();

    get path(){ return this.#path; }
    get server(){ return this.#server; }
    get config(){ return this.#config; }
    get modules(){ return this.#modules; }

    /**
     * Application server service's constructor
     * 
     * @param {String} path unique service name
     * @param {ApplicationServer} server application server object
     * @param {Object} config config
     */
    constructor(path, server, config) {
        this.#path = path;
        this.#server = server;
        this.#config = config;

        if(config.modules) {
            const modules = Object.keys(config.modules);

            modules.forEach(name => this.reg(ApplicationServerServiceModuleFactory.gen(name, this, config.modules[name])));
        }
    }

    /**
     * Register service's module
     * 
     * @param {ApplicationServerServiceModule} module module object
     */
    reg(module) {
        this.#modules.set(module.name, module);
    }

    /**
     * Install service
     */
    async install() {
        const result = {};
        for(const module of this.#modules) {
            result[module.constructor.name] = await module.install();
        }
        return result;
    }

    /**
     * Service on
     */
    async on() {
        this.#modules.forEach(async module => await module.on());
    }

    /**
     * Service off
     */
    async off() {
        this.#modules.forEach(async module => await module.off());
    }

    /**
     * Execute module's method
     * 
     * @param {String} name         module name
     * @param {String} method       module method
     * @param  {...any} args        arguments
     * @returns Object              result
     */
    async moduleCall(name, method, ...args) {
        const module = this.#modules.get(name);
        if(module) {
            return await module.call(method, ...args);
        }

        throw new ApplicationExceptionUnsupported();
    }

    /**
     * Execute service method
     * 
     * @param {String} method       method name
     * @param  {...any} args        arguments
     * @returns Object              result
     */
    async call(method, ...args) {
        if(typeof this[method] === "function") {
            return await this[method](...args);
        }

        throw new ApplicationExceptionUnsupported();
    }
}
