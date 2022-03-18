export const time = (req, res, next) => {
	req.date = new Date();
	next();
};
