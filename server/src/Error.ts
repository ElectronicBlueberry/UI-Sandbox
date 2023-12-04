import { Response } from "express";

export class HttpError extends Error {
	public errorCode: number;

	constructor(message: string, errorCode = 500) {
		super(message);
		this.errorCode = errorCode;
	}

	static fromError(error: Error): HttpError {
		const newError = new HttpError(error.message);
		return Object.assign(newError, error);
	}

	send(res: Response) {
		res.status(this.errorCode);
		res.send(JSON.stringify(this));
	}
}
