const error = (err, req, res, _next) => res.status(err.error).json({ message: err.message });

module.exports = error;