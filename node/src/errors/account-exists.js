module.exports = class AccountExistsError extends Error {
    constructor(message = "The account specified already exists") {
        super(message);
        this.name = "Account Exists"
    }
}
