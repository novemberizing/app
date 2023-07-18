/**
 * @module          ApplicationServerExpress
 */
import express from "express";

import Log from "@novemberizing/log";

import ApplicationServer from "../Server.js";
import ApplicationServerServiceFactory from "./service/Factory.js";

import ApplicationExceptionInvalidParameter from "../exception/invalid/Parameter.js";

/**
 * @class
 * 
 * Express application server
 */
export default class ApplicationServerExpress extends ApplicationServer {
    static #tag = "ApplicationServerExpress";

    #port = null;
    #hostname = null;
    #backlog = null;
    #express = null;
    #server = null;

    get express(){ return this.#express; }

    /**
     * Application Server Express constructor.
     * 
     * @param {Object} config       Settings to create Express application server
     */
    constructor(config) {
        super(config);

        this.#port = parseInt(config.port);
        this.#hostname = config.hostname;
        this.#backlog = config.backlog;

        if(isNaN(this.#port)) { throw new ApplicationExceptionInvalidParameter(); }

        this.#express = express();

        if(config.services) {
            const services = Object.keys(config.services);

            services.forEach(name => this.reg(ApplicationServerServiceFactory.gen(name, this, config.services[name])));
        }
    }

    /**
     * Server on
     */
    async on() {
        if(this.#server == null) this.#server= this.#express.listen(this.#port, this.#hostname, this.#backlog, () => Log.i(ApplicationServerExpress.#tag, "on()"));
    }

    /**
     * Server off
     */
    async off() {
        if(this.#server) {
            this.#server.close();
        }
        super.off();
    }
}