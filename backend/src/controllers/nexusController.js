const nexusService = require("../services/nexusService");

exports.getTopProducts = (req, res) => {
  return res.json(nexusService.getTopProducts());
};

exports.getTopRegions = (req, res) => {
  return res.json(nexusService.getTopRegions());
};

exports.getTopCustomers = (req, res) => {
  return res.json(nexusService.getTopCustomers());
};
