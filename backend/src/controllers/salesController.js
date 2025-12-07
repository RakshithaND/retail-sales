const dataService = require('../services/dataService');

exports.getSales = (req, res) => {
  try {
    const {
      search,
      region,
      gender,
      ageMin,
      ageMax,
      category,
      tags,
      payment,
      dateFrom,
      dateTo,
      sortBy,
      page
    } = req.query;

    const result = dataService.getFilteredData({
      search,
      region,
      gender,
      ageMin,
      ageMax,
      category,
      tags,
      payment,
      dateFrom,
      dateTo,
      sortBy,
      page
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
