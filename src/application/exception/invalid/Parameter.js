import ApplicationExceptionInvalid from "../Invalid.js";

export default class ApplicationExceptionInvalidParameter extends ApplicationExceptionInvalid {
    constructor(message, original = undefined) {
        super(message, original);
    }
}
