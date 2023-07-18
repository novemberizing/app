import ApplicationException from "../Exception.js";

export default class ApplicationExceptionInvalid extends ApplicationException {
    constructor(message, original = undefined) {
        super(message, original);
    }
}