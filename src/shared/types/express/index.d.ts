import "express-serve-static-core";

declare module "express-serve-static-core" {
	interface Request {
		userId?: string;
	}
}

const test: string = 123;
