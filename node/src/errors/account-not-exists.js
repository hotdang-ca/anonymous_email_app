module.exports = class AccountNotExistsError extends Error {
    constructor(message = "The specified account does not exist") {
        super(message);
        this.name = "Account Not Found"
    }
}
