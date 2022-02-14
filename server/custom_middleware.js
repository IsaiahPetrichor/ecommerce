export const timeMiddleware = (req, res, next) => {
	req.date = new Date();
	next();
};

export const authMiddleware = (req, res, next) => {
	if (authenticated === true) {
		next();
	} else {
		res.status(401).send('Please login to continue...');
	}
};
