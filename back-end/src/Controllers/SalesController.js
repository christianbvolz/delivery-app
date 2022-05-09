const SalesService = require('../Services/SalesService');

const getAll = async (_req, res, _next) => {  
  const dadosUser = window.localStorage.getItem('tarefa'); // Verificar como pegar pelo localStorage ou pelo token
  const info = JSON.parse(dadosUser);
  
  const data = await SalesService.getAll(info.id);

  return res.status(200).json(data);
};

module.exports = {
  getAll,
};