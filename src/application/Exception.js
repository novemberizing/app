import Log from "@novemberizing/log";

export default class ApplicationException extends Error {
    static #tag = "ApplicationException";

    #original = null;

    get original(){ return this.#original; }

    constructor(message, original = undefined) {
        super(message);

        this.#original = original;

        if(this.#original) {
            Log.w(ApplicationException.#tag, original);
        }
    }
}