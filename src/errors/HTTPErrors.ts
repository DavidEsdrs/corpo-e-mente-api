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

/**
 * Exceção gerada quando um email vier vazio
 */
class NullEmailError extends HTTPErrors {
    constructor() {
        super("Null email input", "Email cannot be null!", 422);
    }
}

/**
 * Exceção gerada quando uma senha vier vazia
 */
class NullPasswordError extends HTTPErrors {
    constructor() {
        super("Null password input", "Password cannot be null!", 422);
    }
}

/**
 * Exceção gerada quando algum argumento não for válido
 */
class InvalidArgumentError extends HTTPErrors {
    constructor(message?: string) {
        super("Invalid arguments", message ?? "Some argument is invalid!", 422);
    }
}

/**
 * Exceção gerada quando um dado email já existe no banco de dados
 */
class EmailAlreadyExistsError extends HTTPErrors {
    constructor() {
        super("Email already exists", "The inserted email already is registered!", 422);
    }
}

/**
 * Exceção gerada quando uma requisição não é autorizada
 */
class UnauthorizedRequestError extends HTTPErrors {
    constructor() {
        super("Unauthorized request", "The client request is unauthorized!", 401);
    }
}

/**
 * Exceção gerada quando uma tag já está cadastrada no servidor
 */
class TagAlreadyExistError extends HTTPErrors {
    constructor() {
        super("Tag already exists", "The given tag already exists!", 422);
    }
}

/**
 * Exceção gerada quando uma tag não existe
 */
class InvalidTagError extends HTTPErrors {
    constructor() {
        super("Tag doesn't exist", "The given tag doesn't exist!", 422);
    }
}

/**
 * Exceção gerada quando o remetente e destinatário do elogio são iguais
 */
 class SenderEqualsReceiverError extends HTTPErrors {
    constructor() {
        super("Sender equals receiver", "The given receiver is the same as sender!", 422);
    }
}

/**
 * Exceção gerada quando um elogio é enviado para um usuário inválido
 */
class InvalidUserReceiverError extends HTTPErrors {
    constructor() {
        super("Invalid user receiver", "The given user receiver doesn't exist!", 422);
    }
}

/**
 * Exceção gerada quando o usuário não está autenticado
 */
class UnauthenticatedUserError extends HTTPErrors {
    constructor() {
        super("Unauthenticated user", "User don't authenticated!", 422);
    }
}

class AlreadyScheduledError extends HTTPErrors {
    constructor() {
        super("Already Scheduled Date", "The given date already has an appointment!", 422);
    }
}

export { 
    HTTPErrors, 
    NullEmailError, 
    NullPasswordError,
    InvalidArgumentError,
    EmailAlreadyExistsError, 
    UnauthorizedRequestError, 
    TagAlreadyExistError,
    InvalidTagError,
    SenderEqualsReceiverError,
    InvalidUserReceiverError,
    UnauthenticatedUserError,
    AlreadyScheduledError
};