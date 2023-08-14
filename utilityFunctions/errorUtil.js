// class AppError extends Error { ... }: This line defines a new class named AppError that extends the built-in Error class. By extending Error, you create a new error class that inherits the properties and behavior of the standard Error class.
class AppError extends Error {
    constructor(message, statusCode) {
        // message: The error message that you want to associate with the error instance.
        // statusCode: A numeric HTTP status code that indicates the type of error.
        super(message);
        // The super keyword is used to call the constructor of the parent class (Error in this case). It's necessary to call the parent constructor to initialize the error message property (message) that the Error class provides.

        this.statusCode = statusCode;

        //stackTrace - to know in which line the code breaked
        Error.captureStackTrace(this, this.contructor);
        //this: Refers to the instance of the error that you're constructing. In this context, it's an instance of the AppError class.

        // this.constructor: Refers to the constructor function of the error instance. In your case, it's the constructor function of the AppError class.
    }
}

export default AppError;
