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
    /**
     * 함수를 수행하는 유틸리티 함수로 예외가 발생했을 경우 exception 함수를 수행하게 됩니다.
     * 
     * @param {Function} func           수행할 함수
     * @param {Function} exception      예외가 발생했을 경우 처리할 함수
     */
    static async call(func, exception) {
        try {
            await func();
        } catch(e) {
            if(exception) await exception(e);
        }
    }

    /**
     * 예외가 발생했을 경우 사용자에게 전송하기 위해서 메시지를 만든다.
     * 
     * @param {Error} e 
     * @returns {Object}
     */
    static error(e) {
        /** TODO: 보다 좋은 로깅을 하자. */
        console.log(e);
        return {
            name: e.name,
            message: e.message
        }
    }

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
