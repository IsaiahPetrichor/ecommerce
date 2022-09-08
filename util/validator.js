function validEmail(emailParam) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailParam);
}

export const registerValidator = (req, res, next) => {
  const { email, first_name, last_name, password } = req.body;

  if (![email, first_name, last_name, password].every(Boolean)) {
    return res.status(400).json('Missing Credentials');
  } else if (!validEmail(email)) {
    return res.status(400).json('Invalid Email Format');
  } else {
    next();
  }
};

export const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (![email, password].every(Boolean)) {
    return res.status(400).json('Missing Credentials');
  } else if (!validEmail(email)) {
    return res.status(400).json('Invalid Email Format');
  }

  next();
};
