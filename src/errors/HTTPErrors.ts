/**
 * Classe responsável pelas exceções da API
 */
class HTTPErrors extends Error {
    status: number;

    constructor(name: string, message: string, status: number) {
        super(message);
        Object.setPrototypeOf(this, HTTPErrors.prototype);
        this.name = name;
        this.status = status;
    }
}

class InvalidArgumentError extends HTTPErrors {
    constructor(message?: string) {
        super("Invalid arguments", message ?? "Some argument is invalid!", 422);
    }
}

class EmailAlreadyExistsError extends HTTPErrors {
    constructor() {
        super("Email already exists", "The inserted email already is registered!", 422);
    }
}

export { 
    HTTPErrors, 
    InvalidArgumentError,
    EmailAlreadyExistsError, 
};