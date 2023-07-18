/**
 * @module      Application
 */
import ApplicationServerExpress from "./application/server/Express.js";
import ApplicationServerFactory from "./application/server/Factory.js";
import ApplicationServerServiceFactory from "./application/server/service/Factory.js";
import ApplicationServerServiceRoot from "./application/server/service/Root.js";
import ApplicationServerServiceModuleFactory from "./application/server/service/module/Factory.js";

/**
 * @class
 * 
 * Application class
 */
export default class Application {
    static {
        Application.use(ApplicationServerExpress);

        Application.use(ApplicationServerServiceRoot);
    }
    
    static #config = null;
    static #administrator = null;
    static #server = null;

    static get administrator(){ return Application.#administrator; }
    static get server(){ return Application.#server; }

    /**
     * Register with the framework to use the classes `ApplicationServer`, `ApplicationServerService` and
     * `ApplicationServerServiceModule`
     * 
     * @param {Type}    c   class
     */
    static use(c) {
        let parent = Object.getPrototypeOf(c);

        while(parent && parent.name) {
            if(parent.name === "ApplicationServer") {
                ApplicationServerFactory.use(c);
                break;
            }
            if(parent.name === "ApplicationServerService") {
                ApplicationServerServiceFactory.use(c);
                break;
            }
            if(parent.name === "ApplicationServerServiceModule") {
                ApplicationServerServiceModuleFactory.use(c);
                break;
            }

            parent = Object.getPrototypeOf(parent);
        }
    }

    /**
     * Run server application
     * 
     * @param {Config} config       config object
     */
    static async on(config) {
        Application.#config = config;

        Application.#administrator = await ApplicationServerFactory.gen(Application.#config.get("administrator"));
        Application.#server = await ApplicationServerFactory.gen(Application.#config.get("server"));

        await Application.#administrator.on();
        await Application.#server.on();
    }

    /**
     * Server application shutdown
     */
    static async off() {
        await Application.#administrator.off();
        await Application.#server.off();
    }

    /**
     * Execute service method
     * 
     * @param {String} path         service name
     * @param {String} method       internal method
     * @param  {...any} args        argument
     * @returns Object              result
     */
    static async call(path, method, ...args) {
        return Application.#server.call(path, method, ...args);
    }
}
