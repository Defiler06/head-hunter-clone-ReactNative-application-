import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import { IRequest } from '../interfaces/IRequest';

const authMiddleware = async (
	req: IRequest,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const token = req.get('Authorization');

	if (token == null) {
		res.status(401).send({ error: 'No token presented' });
		return;
	}
	const jwtSecret = 'your-secret-key';

	const decoded: any = jwt.verify(token, jwtSecret);
	const userId = decoded.userId;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const user = await User.find({ where: { id: userId } });

	req.user = user;
	next();
};

export default authMiddleware;
