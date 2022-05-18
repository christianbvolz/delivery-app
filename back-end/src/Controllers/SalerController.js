const SalerService = require('../Services/SalerService');
const { verifyToken } = require('../Token');

const getAll = async (req, res, next) => {  
  const { authorization } = req.headers;
  
  if (!authorization) return next({ error: 400, message: 'UNAUTHORIZED' });

  const authorized = verifyToken(authorization);

  if (!authorized) return next({ error: 400, message: 'UNAUTHORIZED' });
  
  const data = await SalerService.getAll(authorized.id);

  return res.status(200).json(data);
};

module.exports = {
  getAll,
};