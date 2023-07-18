import ApplicationException from "../Exception.js";

export default class ApplicationExceptionUnregistered extends ApplicationException {
    constructor(message, original = undefined) {
        super(message, original);
    }
}