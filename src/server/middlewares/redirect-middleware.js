function redirectMiddleware(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err.status !== 301) {
    next(err);

    return;
  }

  res.redirect(301, err.redirectUrl);
}

export default redirectMiddleware;
