import { IRequest } from '../interfaces/IRequest';
import { NextFunction, Response } from 'express';
import { UserRole } from '../helpers/enum/UserRole.enum';

export const permitMiddleware =
	(...roles: UserRole[]) =>
	(req: IRequest, res: Response, next: NextFunction) => {
		if (!req.user) {
			res.sendStatus(401);
			return;
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (!roles.includes(req.user[0].role as UserRole)) {
			res.sendStatus(403);
			return;
		}
		next();
	};
