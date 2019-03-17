module.exports = (req, res, next) => {
  if (!req.isAuthenticated())
    return res.status(404).send({ error: 'Required account' });
  next();
};
