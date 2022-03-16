import { Response } from 'express';

function success(
    status: number = 200,
    message: string = "",
    errors: Array<string> = [],
    data: any = null,
    res: Response,
): void {
    res.status(status).send({
        status,
        message,
        errors,
        data,
    });
}

function error(
    status: number = 401,
    message: string = "",
    errors: Array<string> = [],
    data: any = null,
    res: Response,
): void {
    res.status(status).send({
        status,
        message,
        errors,
        data,
    });
}

export default { success, error };    