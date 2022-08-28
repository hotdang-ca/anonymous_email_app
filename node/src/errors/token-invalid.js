module.exports = class TokenInvalidError extends Error {
    constructor(message = "The specified access token is invalid") {
        super(message);
        this.name = "Invalid Token Provided"
    }
}
