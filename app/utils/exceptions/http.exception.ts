class HttpException extends Error {
    public status: number;
    public message: string;
    public errors: Array<string>;
    public data: any;

    constructor(status: number, message: string, errors: Array<string>, data?: any) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
        this.data = data;
    }
}
export default HttpException;
