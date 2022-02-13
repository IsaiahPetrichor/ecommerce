export const timeMiddleware = (req, res, next) => {
	req.date = new Date();
	next();
};

export const errorHandler = (err, req, res, next) => {
	console.log(err.stack);
	res.status(500).send('Something went wrong!');
	next(err);
};

export const authMiddleware = (req, res, next) => {
	if (authenticated === true) {
		next();
	} else {
		res.status(401).send('Please login to continue...');
	}
};
