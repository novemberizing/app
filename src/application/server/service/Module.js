/**
 * @module          ApplicationServerServiceModule
 */
import ApplicationExceptionUnsupported from "../../exception/Unsupported.js";

/**
 * @class
 * 
 * Service module's abstract class
 */
export default class ApplicationServerServiceModule {
    #name = null;
    #service = null;
    #config = null;

    get name(){ return this.#name; }
    get service(){ return this.#service; }
    get config(){ return this.#config; }

    /**
     * Module's constructor
     * 
     * @param {String} name                         module name
     * @param {ApplicationServerService} service    service object
     * @param {Object} config                       config
     */
    constructor(name, service, config) {
        this.#name = name;
        this.#service = service;
        this.#config = config;
    }

    /**
     * Module on
     */
    async on() {

    }

    /**
     * Module off
     */
    async off() {

    }

    /**
     * Execute module method
     * 
     * @param {String} method       method name
     * @param  {...any} args        arguments
     * @returns Object              result
     */
    async call(method, ...args) {
        if(typeof this[method] === "function") {
            return this[method](...args);
        }

        throw new ApplicationExceptionUnsupported();
    }
}