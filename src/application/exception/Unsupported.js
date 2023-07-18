import ApplicationException from "../Exception.js";

export default class ApplicationExceptionUnsupported extends ApplicationException {
    constructor(message, original = undefined) {
        super(message, original);
    }
}